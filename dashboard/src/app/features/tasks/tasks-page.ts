/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { finalize, switchMap } from 'rxjs';
import { Category, Tag, Task, TaskFiltersValue, toPayload } from '../../core/models';
import { ConfirmService } from '../../core/services/confirm.service';
import { ToastService } from '../../core/services/toast.service';
import { errorMessage } from '../../core/utils/http';
import { CategoriesService } from '../../features/categories/categories.service';
import { Spinner } from '../../shared/components/spinner';
import { TaskDetails } from './components/task-details';
import { TaskFilters } from './components/task-filters';
import { TaskForm, TaskFormValue } from './components/task-form';
import { TaskList } from './components/task-list';
import { TagService } from './services/tag.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-tasks-page',
  imports: [Spinner, TaskFilters, TaskList, TaskForm, TaskDetails],
  template: `
    <section class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-xl font-semibold text-stone-900">Tarefas</h1>
        <button type="button" class="btn-primary" (click)="openCreate()">Nova tarefa</button>
      </div>

      <app-task-filters [categories]="categories()" [value]="filters()" (changed)="filters.set($event)" />

      @if (loading()) {
        <app-spinner />
      } @else if (loadError()) {
        <div class="card flex flex-col items-center gap-3 p-8 text-center">
          <p class="text-sm text-stone-600">Não foi possível carregar as tarefas.</p>
          <button type="button" class="btn-secondary" (click)="load()">Tentar de novo</button>
        </div>
      } @else {
        <app-task-list
          [tasks]="filtered()"
          [filtered]="hasFilters()"
          (viewTask)="selected.set($event)"
          (editTask)="openEdit($event)"
          (deleteTask)="remove($event)"
          (toggleDone)="toggleDone($event)"
          (create)="openCreate()"
        />
      }
    </section>

    @if (formOpen()) {
      <app-task-form
        [task]="editing()"
        [categories]="categories()"
        [tags]="tags()"
        [saving]="saving()"
        (submitted)="save($event)"
        (cancelled)="closeForm()"
      />
    }

    @if (selected(); as t) {
      <app-task-details
        [task]="t"
        (closed)="selected.set(null)"
        (editTask)="openEdit($event)"
        (deleteTask)="remove($event)"
      />
    }
  `,
})
export class TasksPage implements OnInit {
  private api = inject(TaskService);
  private categoriesApi = inject(CategoriesService);
  private tagsApi = inject(TagService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmService);

  tasks = signal<Task[]>([]);
  categories = signal<Category[]>([]);
  tags = signal<Tag[]>([]);

  loading = signal(true);
  loadError = signal(false);
  saving = signal(false);

  filters = signal<TaskFiltersValue>({ search: '', status: '', priority: '', categoryId: null });

  formOpen = signal(false);
  editing = signal<Task | null>(null);
  selected = signal<Task | null>(null);

  // Preenche a categoria quando a API devolve só o categoryId.
  private enriched = computed(() => {
    const names = new Map(this.categories().map((c) => [c.id, c]));
    return this.tasks().map((t) => ({
      ...t,
      category: t.category ?? (t.categoryId ? names.get(t.categoryId) ?? null : null),
    }));
  });

  hasFilters = computed(() => {
    const f = this.filters();
    return !!(f.search || f.status || f.priority || f.categoryId);
  });

  filtered = computed(() => {
    const f = this.filters();
    const q = f.search.trim().toLowerCase();
    return this.enriched().filter(
      (t) =>
        (!q || `${t.title} ${t.description ?? ''}`.toLowerCase().includes(q)) &&
        (!f.status || t.status === f.status) &&
        (!f.priority || t.priority === f.priority) &&
        (!f.categoryId || (t.categoryId ?? t.category?.id) === f.categoryId),
    );
  });

  ngOnInit() {
    this.load();
    this.categoriesApi.list().subscribe({ next: (c) => this.categories.set(c), error: () => { } });
    this.tagsApi.list().subscribe({ next: (t) => this.tags.set(t), error: () => { } });
  }

  load(silent = false) {
    if (!silent) this.loading.set(true);
    this.loadError.set(false);
    this.api.list().subscribe({
      next: (list) => {
        this.tasks.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  openCreate() {
    this.editing.set(null);
    this.formOpen.set(true);
  }

  openEdit(task: Task) {
    this.selected.set(null);
    this.editing.set(task);
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
    this.editing.set(null);
  }

  save(value: TaskFormValue) {
    const editing = this.editing();
    this.saving.set(true);

    const request$ = editing
      ? this.api.update(editing.id, value.payload)
      : this.api.create(value.payload);

    request$
      .pipe(
        switchMap((saved) =>
          this.api.syncTags(
            editing?.id ?? saved.id,
            (editing?.tags ?? []).map((t: Tag) => t.id),
            value.tagIds,
          ),
        ),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: () => {
          this.toast.success(editing ? 'Tarefa atualizada.' : 'Tarefa criada.');
          this.closeForm();
          this.load(true);
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível salvar a tarefa.')),
      });
  }

  toggleDone(task: Task) {
    const status = task.status === 'completed' ? 'pending' : 'completed';
    this.api.update(task.id, { ...toPayload(task), status }).subscribe({
      next: () => {
        this.tasks.update((l) => l.map((t) => (t.id === task.id ? { ...t, status } : t)));
        this.toast.success(status === 'completed' ? 'Tarefa concluída.' : 'Tarefa reaberta.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível atualizar a tarefa.')),
    });
  }

  async remove(task: Task) {
    const ok = await this.confirm.ask({
      title: 'Excluir tarefa',
      message: `Deseja excluir "${task.title}"? Subtarefas e comentários também serão perdidos.`,
      confirmText: 'Excluir tarefa',
      danger: true,
    });
    if (!ok) return;

    this.api.remove(task.id).subscribe({
      next: () => {
        this.tasks.update((l) => l.filter((t) => t.id !== task.id));
        this.selected.set(null);
        this.toast.success('Tarefa excluída.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível excluir a tarefa.')),
    });
  }
}
