/* eslint-disable @unicorn/filename-case */
import { Component, computed, input, output } from '@angular/core';
import { PRIORITY_LABEL, STATUS_LABEL, Task } from '../../../core/models';
import { formatDate, isOverdue } from '../../../core/utils/date';
import { PRIORITY_CLASS, STATUS_CLASS } from '../../../shared/ui-classes';

@Component({
  selector: 'app-task-card',
  template: `
    <article class="card flex h-full flex-col gap-3 p-4" [class.opacity-70]="inactive()">
      <div class="flex items-start gap-3">
        <input
          type="checkbox"
          class="mt-1 h-4 w-4 accent-brand-600"
          [checked]="done()"
          (change)="toggleDone.emit()"
          [attr.aria-label]="done() ? 'Reabrir tarefa' : 'Concluir tarefa'"
        />
        <button type="button" class="min-w-0 flex-1 text-left" (click)="viewTask.emit()">
          <h3 class="font-medium text-stone-900" [class.line-through]="done()">{{ task().title }}</h3>
          @if (task().description) {
            <p class="mt-1 line-clamp-2 text-sm text-stone-500">{{ task().description }}</p>
          }
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-2 text-xs">
        <span class="rounded-full px-2 py-0.5" [class]="statusClass[task().status]">{{ statusLabel[task().status] }}</span>
        <span class="rounded-full px-2 py-0.5" [class]="priorityClass[task().priority]">
          Prioridade {{ priorityLabel[task().priority].toLowerCase() }}
        </span>
        @if (task().category; as c) {
          <span class="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">{{ c.name }}</span>
        }
        @if (task().dueDate) {
          <span [class]="overdue() ? 'font-medium text-red-600' : 'text-stone-500'">
            {{ overdue() ? 'Atrasada · ' : 'Prazo ' }}{{ date(task().dueDate) }}
          </span>
        }
      </div>

      <div class="mt-auto flex justify-end gap-1 border-t border-stone-100 pt-3">
        <button type="button" class="btn-ghost" (click)="editTask.emit()">Editar</button>
        <button type="button" class="btn-ghost text-red-600" (click)="deleteTask.emit()">Excluir</button>
      </div>
    </article>
  `,
})
export class TaskCard {
  task = input.required<Task>();
  viewTask = output<void>();
  editTask = output<void>();
  deleteTask = output<void>();
  toggleDone = output<void>();

  done = computed(() => this.task().status === 'completed');
  inactive = computed(() => this.task().status === 'completed' || this.task().status === 'cancelled');
  overdue = computed(() => isOverdue(this.task().status, this.task().dueDate));

  statusClass = STATUS_CLASS;
  priorityClass = PRIORITY_CLASS;
  statusLabel = STATUS_LABEL;
  priorityLabel = PRIORITY_LABEL;
  date = formatDate;
}
