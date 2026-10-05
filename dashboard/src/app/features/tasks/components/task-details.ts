/* eslint-disable @unicorn/filename-case */
import { Component, input, output } from '@angular/core';
import { PRIORITY_LABEL, STATUS_LABEL, Task } from '../../../core/models';
import { formatDate, isOverdue } from '../../../core/utils/date';
import { Modal } from '../../../shared/components/modal';
import { PRIORITY_CLASS, STATUS_CLASS } from '../../../shared/ui-classes';
import { CommentList } from './comment-list';
import { SubtasksList } from './subtasks-list';
import { CategoryIcon } from '../../../core/constants/categoryIcon';

@Component({
  selector: 'app-task-details',
  imports: [Modal, SubtasksList, CommentList, CategoryIcon],
  template: `
    <app-modal [title]="task().title" (closed)="closed.emit()">
      <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="rounded-full px-2 py-0.5" [class]="statusClass[task().status]">{{ statusLabel[task().status] }}</span>
          <span class="rounded-full px-2 py-0.5" [class]="priorityClass[task().priority]">
            Prioridade {{ priorityLabel[task().priority].toLowerCase() }}
          </span>
          @if (task().category; as c) {
  <span class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5"
    [style.background-color]="c.color ? c.color + '26' : '#f5f5f4'"
    [style.color]="c.color || '#57534e'">
    <app-category-icon [icon]="c.icon" [color]="c.color" [size]="14" />
    {{ c.name }}
  </span>
}
          @for (tag of task().tags ?? []; track tag.id) {
            <span class="rounded-full border border-stone-200 px-2 py-0.5 text-stone-600">#{{ tag.name }}</span>
          }
          @if (task().dueDate) {
            <span [class]="overdue() ? 'font-medium text-red-600' : 'text-stone-500'">
              {{ overdue() ? 'Atrasada · ' : 'Prazo ' }}{{ date(task().dueDate) }}
            </span>
          }
        </div>

        @if (task().description) {
          <p class="whitespace-pre-line text-sm text-stone-700">{{ task().description }}</p>
        } @else {
          <p class="text-sm text-stone-400">Esta tarefa não tem descrição.</p>
        }

        <div class="flex flex-col gap-6">
          <app-subtasks-list [taskId]="task().id" />
          <app-comment-list [taskId]="task().id" />
        </div>

        <div class="flex justify-end gap-2 border-t border-stone-200 pt-4">
          <button type="button" class="btn-secondary" (click)="editTask.emit(task())">Editar tarefa</button>
          <button type="button" class="btn-danger" (click)="deleteTask.emit(task())">Excluir tarefa</button>
        </div>
      </div>
    </app-modal>
  `,
})
export class TaskDetails {
  task = input.required<Task>();
  closed = output<void>();
  editTask = output<Task>();
  deleteTask = output<Task>();

  statusClass = STATUS_CLASS;
  priorityClass = PRIORITY_CLASS;
  statusLabel = STATUS_LABEL;
  priorityLabel = PRIORITY_LABEL;
  date = formatDate;

  overdue() {
    return isOverdue(this.task().status, this.task().dueDate);
  }
}
