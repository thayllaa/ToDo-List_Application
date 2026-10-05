/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';
import { finalize } from 'rxjs';
import { Subtask } from '../../../core/models';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ToastService } from '../../../core/services/toast.service';
import { errorMessage } from '../../../core/utils/http';
import { Spinner } from '../../../shared/components/spinner';
import { SubtaskService } from '../services/subtask.service';

@Component({
  selector: 'app-subtasks-list',
  imports: [ReactiveFormsModule, Spinner, LucidePencil, LucideTrash2],
  template: `
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-stone-800">Subtarefas</h3>
        @if (items().length) {
          <span class="text-xs text-stone-500">{{ doneCount() }} de {{ items().length }} concluídas</span>
        }
      </div>

      @if (items().length) {
        <div class="h-1.5 overflow-hidden rounded-full bg-stone-100">
          <div class="h-full rounded-full bg-brand-600 transition-all" [style.width.%]="progress()"></div>
        </div>
      }

      @if (loading()) {
        <app-spinner />
      } @else {
        @if (items().length === 0) {
          <p class="rounded-md border border-dashed border-stone-300 p-4 text-center text-sm text-stone-500">
            Nenhuma subtarefa. Quebre esta tarefa em passos menores abaixo.
          </p>
        } @else {
          <ul class="divide-y divide-stone-100 rounded-md border border-stone-200">
            @for (s of items(); track s.id) {
              <li class="flex items-center gap-3 px-3 py-2">
                <input
                  type="checkbox"
                  class="h-4 w-4 accent-brand-600"
                  [checked]="s.isCompleted"
                  (change)="toggle(s, $event)"
                  [attr.aria-label]="'Concluir ' + s.title"
                />

                @if (editingId() === s.id) {
                  <input
                    type="text"
                    class="form-input flex-1"
                    aria-label="Editar subtarefa"
                    [formControl]="editTitle"
                    (keydown.enter)="saveEdit(s)"
                    (keydown.escape)="cancelEdit()"
                  />
                  <button type="button" class="btn-primary shrink-0" [disabled]="editTitle.invalid" (click)="saveEdit(s)">
                    Salvar
                  </button>
                  <button type="button" class="btn-secondary shrink-0" (click)="cancelEdit()">Cancelar</button>
                } @else {
                  <span class="flex-1 text-sm" [class]="s.isCompleted ? 'text-stone-400 line-through' : 'text-stone-800'">
                    {{ s.title }}
                  </span>
                  <button type="button" class="btn-ghost px-2!" title="Editar"
                    [attr.aria-label]="'Editar subtarefa ' + s.title" (click)="startEdit(s)">
                    <svg lucidePencil class="size-4.5"></svg>
                  </button>
                  <button type="button" class="btn-ghost px-2! text-red-600" title="Excluir"
                    [attr.aria-label]="'Excluir subtarefa ' + s.title" (click)="remove(s)">
                    <svg lucideTrash2 class="size-4.5"></svg>
                  </button>
                }
              </li>
            }
          </ul>
        }

        <form class="flex gap-2" (submit)="$event.preventDefault(); add()">
          <input
            type="text"
            class="form-input"
            placeholder="Nova subtarefa"
            aria-label="Título da nova subtarefa"
            [formControl]="title"
          />
          <button type="submit" class="btn-primary shrink-0" [disabled]="adding() || title.invalid">Adicionar</button>
        </form>
      }
    </section>
  `,
})
export class SubtasksList implements OnInit {
  private api = inject(SubtaskService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmService);

  taskId = input.required<number>();

  items = signal<Subtask[]>([]);
  loading = signal(true);
  adding = signal(false);
  editingId = signal<number | null>(null);

  doneCount = computed(() => this.items().filter((s) => s.isCompleted).length);
  progress = computed(() =>
    this.items().length ? Math.round((this.doneCount() / this.items().length) * 100) : 0,
  );

  title = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(255)],
  });
  editTitle = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(255)],
  });

  ngOnInit() {
    this.api.list(this.taskId()).subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Não foi possível carregar as subtarefas.');
      },
    });
  }

  add() {
    const title = this.title.value.trim();
    if (!title) return;
    this.adding.set(true);
    this.api
      .create(this.taskId(), { title })
      .pipe(finalize(() => this.adding.set(false)))
      .subscribe({
        next: (created) => {
          this.items.update((l) => [...l, created]);
          this.title.reset('');
          this.toast.success('Subtarefa adicionada.');
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível adicionar a subtarefa.')),
      });
  }

  toggle(s: Subtask, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isCompleted = !s.isCompleted;
    this.api.update(this.taskId(), s.id, { title: s.title, isCompleted }).subscribe({
      next: () => this.items.update((l) => l.map((x) => (x.id === s.id ? { ...x, isCompleted } : x))),
      error: (e) => {
        checkbox.checked = s.isCompleted; // volta o checkbox ao estado salvo
        this.toast.error(errorMessage(e, 'Não foi possível atualizar a subtarefa.'));
      },
    });
  }

  startEdit(s: Subtask) {
    this.editingId.set(s.id);
    this.editTitle.setValue(s.title);
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit(s: Subtask) {
    const title = this.editTitle.value.trim();
    if (!title || this.editTitle.invalid) return;
    if (title === s.title) {
      this.cancelEdit();
      return;
    }
    this.api.update(this.taskId(), s.id, { title, isCompleted: s.isCompleted }).subscribe({
      next: () => {
        this.items.update((l) => l.map((x) => (x.id === s.id ? { ...x, title } : x)));
        this.cancelEdit();
        this.toast.success('Subtarefa atualizada.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível atualizar a subtarefa.')),
    });
  }

  async remove(s: Subtask) {
    const ok = await this.confirm.ask({
      title: 'Excluir subtarefa',
      message: `Deseja excluir "${s.title}"?`,
      confirmText: 'Excluir subtarefa',
      danger: true,
    });
    if (!ok) return;
    this.api.remove(this.taskId(), s.id).subscribe({
      next: () => {
        this.items.update((l) => l.filter((x) => x.id !== s.id));
        this.toast.success('Subtarefa excluída.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível excluir a subtarefa.')),
    });
  }
}
