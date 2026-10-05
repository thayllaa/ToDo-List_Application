/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Subtask } from '../../../core/models';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ToastService } from '../../../core/services/toast.service';
import { errorMessage } from '../../../core/utils/http';
import { Spinner } from '../../../shared/components/spinner';
import { SubtaskService } from '../services/subtask.service';

@Component({
  selector: 'app-subtasks-list',
  imports: [ReactiveFormsModule, Spinner],
  template: `
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-stone-800">Subtarefas</h3>
        @if (items().length) {
          <span class="text-xs text-stone-500">{{ doneCount() }} de {{ items().length }} concluídas</span>
        }
      </div>

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
                  (change)="toggle(s)"
                  [attr.aria-label]="'Concluir ' + s.title"
                />
                <span class="flex-1 text-sm" [class]="s.isCompleted ? 'text-stone-400 line-through' : 'text-stone-800'">
                  {{ s.title }}
                </span>
                <button type="button" class="btn-ghost text-red-600" (click)="remove(s)">Excluir</button>
              </li>
            }
          </ul>
        }

        <form class="flex gap-2" (ngSubmit)="add()">
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
  doneCount = computed(() => this.items().filter((s) => s.isCompleted).length);

  title = new FormControl('', {
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

  toggle(s: Subtask) {
    const isCompleted = !s.isCompleted;
    this.api.update(this.taskId(), s.id, { title: s.title, isCompleted }).subscribe({
      next: () => this.items.update((l) => l.map((x) => (x.id === s.id ? { ...x, isCompleted } : x))),
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
