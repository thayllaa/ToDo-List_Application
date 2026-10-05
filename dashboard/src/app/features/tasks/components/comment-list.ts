/* eslint-disable @unicorn/filename-case */
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';
import { finalize } from 'rxjs';
import { TaskComment } from '../../../core/models';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ToastService } from '../../../core/services/toast.service';
import { errorMessage } from '../../../core/utils/http';
import { Spinner } from '../../../shared/components/spinner';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment-list',
  imports: [ReactiveFormsModule, DatePipe, Spinner, LucidePencil, LucideTrash2],
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
                @if (editingId() === c.id) {
                  <div class="space-y-2">
                    <textarea
                      rows="2"
                      class="form-input"
                      aria-label="Editar comentário"
                      [formControl]="editContent"
                      (keydown.escape)="cancelEdit()"
                    ></textarea>
                    <div class="flex justify-end gap-2">
                      <button type="button" class="btn-secondary" (click)="cancelEdit()">Cancelar</button>
                      <button type="button" class="btn-primary" [disabled]="editContent.invalid || savingEdit()"
                        (click)="saveEdit(c)">
                        Salvar
                      </button>
                    </div>
                  </div>
                } @else {
                  <div class="flex items-start justify-between gap-3">
                    <p class="whitespace-pre-line text-sm text-stone-800">{{ c.content }}</p>
                    <div class="flex shrink-0 gap-1">
                      <button type="button" class="btn-ghost px-2!" title="Editar"
                        aria-label="Editar comentário" (click)="startEdit(c)">
                        <svg lucidePencil class="size-3.5"></svg>
                      </button>
                      <button type="button" class="btn-ghost px-2! text-red-600" title="Excluir"
                        aria-label="Excluir comentário" (click)="remove(c)">
                        <svg lucideTrash2 class="size-3.5"></svg>
                      </button>
                    </div>
                  </div>
                  @if (c.createdAt) {
                    <p class="mt-1 text-xs text-stone-500">{{ c.createdAt | date: 'dd/MM/yyyy HH:mm' }}</p>
                  }
                }
              </li>
            }
          </ul>
        }

        <form class="space-y-2" (submit)="$event.preventDefault(); add()">
          <textarea
            rows="2"
            class="form-input"
            placeholder="Escreva um comentário (Ctrl+Enter envia)"
            aria-label="Novo comentário"
            [formControl]="content"
            (keydown.control.enter)="add()"
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
  editingId = signal<number | null>(null);
  savingEdit = signal(false);

  content = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  editContent = new FormControl('', { nonNullable: true, validators: [Validators.required] });

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
    if (!content || this.adding()) return;
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

  startEdit(c: TaskComment) {
    this.editingId.set(c.id);
    this.editContent.setValue(c.content);
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit(c: TaskComment) {
    const content = this.editContent.value.trim();
    if (!content) return;
    if (content === c.content) {
      this.cancelEdit();
      return;
    }
    this.savingEdit.set(true);
    this.api
      .update(this.taskId(), c.id, { content })
      .pipe(finalize(() => this.savingEdit.set(false)))
      .subscribe({
        next: () => {
          this.items.update((l) => l.map((x) => (x.id === c.id ? { ...x, content } : x)));
          this.cancelEdit();
          this.toast.success('Comentário atualizado.');
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível atualizar o comentário.')),
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
