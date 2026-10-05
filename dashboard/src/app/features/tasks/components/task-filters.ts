/* eslint-disable @unicorn/filename-case */
import { Component, computed, input, output } from '@angular/core';
import {
  Category,
  PRIORITY_LABEL,
  STATUS_LABEL,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskFiltersValue,
} from '../../../core/models';

@Component({
  selector: 'app-task-filters',
  template: `
    <div class="card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
      <div class="sm:col-span-2">
        <label class="form-label" for="f-search">Buscar</label>
        <input
          id="f-search"
          type="search"
          class="form-input"
          placeholder="Título ou descrição"
          [value]="value().search"
          (input)="update({ search: $any($event.target).value })"
        />
      </div>

      <div>
        <label class="form-label" for="f-status">Status</label>
        <select id="f-status" class="form-input" (change)="update({ status: $any($event.target).value })">
          <option value="" [selected]="!value().status">Todos</option>
          @for (s of statuses; track s) {
            <option [value]="s" [selected]="value().status === s">{{ statusLabel[s] }}</option>
          }
        </select>
      </div>

      <div>
        <label class="form-label" for="f-priority">Prioridade</label>
        <select id="f-priority" class="form-input" (change)="update({ priority: $any($event.target).value })">
          <option value="" [selected]="!value().priority">Todas</option>
          @for (p of priorities; track p) {
            <option [value]="p" [selected]="value().priority === p">{{ priorityLabel[p] }}</option>
          }
        </select>
      </div>

      <div>
        <label class="form-label" for="f-category">Categoria</label>
        <select
          id="f-category"
          class="form-input"
          (change)="update({ categoryId: +$any($event.target).value || null })"
        >
          <option value="" [selected]="!value().categoryId">Todas</option>
          @for (c of categories(); track c.id) {
            <option [value]="c.id" [selected]="value().categoryId === c.id">{{ c.name }}</option>
          }
        </select>
      </div>

      @if (hasFilters()) {
        <div class="sm:col-span-2 lg:col-span-5">
          <button type="button" class="btn-ghost" (click)="clear()">Limpar filtros</button>
        </div>
      }
    </div>
  `,
})
export class TaskFilters {
  categories = input<Category[]>([]);
  value = input.required<TaskFiltersValue>();
  changed = output<TaskFiltersValue>();

  statuses = TASK_STATUSES;
  priorities = TASK_PRIORITIES;
  statusLabel = STATUS_LABEL;
  priorityLabel = PRIORITY_LABEL;

  hasFilters = computed(() => {
    const v = this.value();
    return !!(v.search || v.status || v.priority || v.categoryId);
  });

  update(patch: Partial<TaskFiltersValue>) {
    this.changed.emit({ ...this.value(), ...patch });
  }

  clear() {
    this.changed.emit({ search: '', status: '', priority: '', categoryId: null });
  }
}
