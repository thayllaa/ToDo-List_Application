/* eslint-disable @unicorn/filename-case */
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Category,
  PRIORITY_LABEL,
  STATUS_LABEL,
  TASK_PRIORITIES,
  TASK_STATUSES,
  Tag,
  Task,
  TaskPayload,
  TaskPriority,
  TaskStatus,
} from '../../../core/models';
import { Modal } from '../../../shared/components/modal';

export interface TaskFormValue {
  payload: TaskPayload;
  tagIds: number[];
}

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, Modal],
  template: `
    <app-modal [title]="task() ? 'Editar tarefa' : 'Nova tarefa'" (closed)="cancelled.emit()">
      @if (categories().length === 0) {
        <p class="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          Toda tarefa precisa de uma categoria. Crie a primeira na página Categorias e volte aqui.
        </p>
      }

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4" novalidate>
        <div>
          <label class="form-label" for="t-title">Título</label>
          <input id="t-title" type="text" formControlName="title" class="form-input" />
          @if (form.controls.title.touched && form.controls.title.invalid) {
            <span class="form-error">Informe um título com até 255 caracteres.</span>
          }
        </div>

        <div>
          <label class="form-label" for="t-desc">Descrição</label>
          <textarea id="t-desc" rows="3" formControlName="description" class="form-input"></textarea>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="form-label" for="t-status">Status</label>
            <select id="t-status" formControlName="status" class="form-input">
              @for (s of statuses; track s) {
                <option [value]="s">{{ statusLabel[s] }}</option>
              }
            </select>
          </div>
          <div>
            <label class="form-label" for="t-priority">Prioridade</label>
            <select id="t-priority" formControlName="priority" class="form-input">
              @for (p of priorities; track p) {
                <option [value]="p">{{ priorityLabel[p] }}</option>
              }
            </select>
          </div>
          <div>
            <label class="form-label" for="t-due">Prazo</label>
            <input id="t-due" type="date" formControlName="dueDate" class="form-input" />
          </div>
          <div>
            <label class="form-label" for="t-cat">Categoria</label>
            <select id="t-cat" formControlName="categoryId" class="form-input">
              <option [ngValue]="null" disabled>Selecione uma categoria</option>
              @for (c of categories(); track c.id) {
                <option [ngValue]="c.id">{{ c.name }}</option>
              }
            </select>
            @if (form.controls.categoryId.touched && form.controls.categoryId.invalid) {
              <span class="form-error">Escolha uma categoria.</span>
            }
          </div>
        </div>

        @if (tags().length) {
          <fieldset>
            <legend class="form-label">Tags</legend>
            <div class="flex flex-wrap gap-2">
              @for (tag of tags(); track tag.id) {
                <button
                  type="button"
                  class="rounded-full border px-3 py-1 text-xs transition"
                  [class]="isSelected(tag.id)
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-100'"
                  [attr.aria-pressed]="isSelected(tag.id)"
                  (click)="toggleTag(tag.id)"
                >
                  {{ tag.name }}
                </button>
              }
            </div>
          </fieldset>
        }

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="btn-secondary" (click)="cancelled.emit()">Cancelar</button>
          <button type="submit" class="btn-primary" [disabled]="saving() || categories().length === 0">
            {{ saving() ? 'Salvando...' : 'Salvar tarefa' }}
          </button>
        </div>
      </form>
    </app-modal>
  `,
})
export class TaskForm {
  private fb = inject(FormBuilder);

  task = input<Task | null>(null);
  categories = input<Category[]>([]);
  tags = input<Tag[]>([]);
  saving = input(false);

  submitted = output<TaskFormValue>();
  cancelled = output<void>();

  statuses = TASK_STATUSES;
  priorities = TASK_PRIORITIES;
  statusLabel = STATUS_LABEL;
  priorityLabel = PRIORITY_LABEL;

  selectedTagIds = signal<number[]>([]);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
    status: ['pending' as TaskStatus],
    priority: ['medium' as TaskPriority],
    dueDate: [''],
    categoryId: [null as number | null, Validators.required],
  });

  constructor() {
    effect(() => {
      const t = this.task();
      this.form.reset({
        title: t?.title ?? '',
        description: t?.description ?? '',
        status: t?.status ?? 'pending',
        priority: t?.priority ?? 'medium',
        dueDate: t?.dueDate?.slice(0, 10) ?? '',
        categoryId: t?.categoryId ?? t?.category?.id ?? null,
      });
      this.selectedTagIds.set((t?.tags ?? []).map((x: Tag) => x.id));
    });
  }

  isSelected(id: number) {
    return this.selectedTagIds().includes(id);
  }

  toggleTag(id: number) {
    this.selectedTagIds.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.submitted.emit({
      payload: {
        title: v.title.trim(),
        description: v.description.trim(),
        status: v.status,
        priority: v.priority,
        dueDate: v.dueDate || null,
        categoryId: v.categoryId as number,
      },
      tagIds: this.selectedTagIds(),
    });
  }
}
