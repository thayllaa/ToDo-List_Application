/* eslint-disable @unicorn/filename-case */
import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models';
import { EmptyState } from '../../../shared/components/empty-state';
import { TaskCard } from './task-card';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard, EmptyState],
  template: `
    @if (tasks().length) {
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        @for (t of tasks(); track t.id) {
          <app-task-card
            [task]="t"
            (viewTask)="viewTask.emit(t)"
            (editTask)="editTask.emit(t)"
            (deleteTask)="deleteTask.emit(t)"
            (toggleDone)="toggleDone.emit(t)"
          />
        }
      </div>
    } @else if (filtered()) {
      <app-empty-state
        icon="🔍"
        title="Nenhuma tarefa encontrada"
        description="Nenhuma tarefa combina com os filtros atuais. Ajuste a busca ou limpe os filtros."
      />
    } @else {
      <app-empty-state
        title="Você ainda não tem tarefas"
        description="Crie a primeira tarefa para começar a se organizar."
      >
        <button type="button" class="btn-primary" (click)="create.emit()">Nova tarefa</button>
      </app-empty-state>
    }
  `,
})
export class TaskList {
  tasks = input.required<Task[]>();
  filtered = input(false);

  viewTask = output<Task>();
  editTask = output<Task>();
  deleteTask = output<Task>();
  toggleDone = output<Task>();
  create = output<void>();
}
