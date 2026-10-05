/* eslint-disable @unicorn/filename-case */
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TaskComment } from '../../../core/models';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ToastService } from '../../../core/services/toast.service';
import { errorMessage } from '../../../core/utils/http';
import { Spinner } from '../../../shared/components/spinner';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment-list',
  imports: [ReactiveFormsModule, DatePipe, Spinner],
  template: `
    <section class="space-y-3">
      <h3 class="font-semibold text-stone-800">Comentários</h3>

      @if (loading()) {
        <app-spinner />
      } @else {
        @if (items().length === 0) {
          <p class="rounded-md border border-dashed border-stone-300 p-4 text-center text-sm text-stone-500">
            Nenhum comentário ainda. Registre decisões ou observações sobre esta tarefa.
          </p>
        } @else {
          <ul class="space-y-2">
            @for (c of items(); track c.id) {
              <li class="rounded-md bg-stone-50 p-3">
                <div class="flex items-start justify-between gap-3">
                  <p class="whitespace-pre-line text-sm text-stone-800">{{ c.content }}</p>
                  <button type="button" class="btn-ghost shrink-0 text-red-600" (click)="remove(c)">Excluir</button>
                </div>
                @if (c.createdAt) {
                  <p class="mt-1 text-xs text-stone-500">{{ c.createdAt | date: 'dd/MM/yyyy HH:mm' }}</p>
                }
              </li>
            }
          </ul>
        }

        <form class="space-y-2" (ngSubmit)="add()">
          <textarea
            rows="2"
            class="form-input"
            placeholder="Escreva um comentário"
            aria-label="Novo comentário"
            [formControl]="content"
          ></textarea>
          <div class="flex justify-end">
            <button type="submit" class="btn-primary" [disabled]="adding() || content.invalid">Comentar</button>
          </div>
        </form>
      }
    </section>
  `,
})
export class CommentList implements OnInit {
  private api = inject(CommentService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmService);

  taskId = input.required<number>();

  items = signal<TaskComment[]>([]);
  loading = signal(true);
  adding = signal(false);

  content = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  ngOnInit() {
    this.api.list(this.taskId()).subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Não foi possível carregar os comentários.');
      },
    });
  }

  add() {
    const content = this.content.value.trim();
    if (!content) return;
    this.adding.set(true);
    this.api
      .create(this.taskId(), { content })
      .pipe(finalize(() => this.adding.set(false)))
      .subscribe({
        next: (created) => {
          this.items.update((l) => [...l, created]);
          this.content.reset('');
          this.toast.success('Comentário adicionado.');
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível comentar.')),
      });
  }

  async remove(c: TaskComment) {
    const ok = await this.confirm.ask({
      title: 'Excluir comentário',
      message: 'Deseja excluir este comentário? Esta ação não pode ser desfeita.',
      confirmText: 'Excluir comentário',
      danger: true,
    });
    if (!ok) return;
    this.api.remove(this.taskId(), c.id).subscribe({
      next: () => {
        this.items.update((l) => l.filter((x) => x.id !== c.id));
        this.toast.success('Comentário excluído.');
      },
      error: (e) => this.toast.error(errorMessage(e, 'Não foi possível excluir o comentário.')),
    });
  }
}
