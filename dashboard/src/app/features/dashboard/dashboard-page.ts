/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRIORITY_LABEL } from '../../core/models';
import { formatDate, isOverdue } from '../../core/utils/date';
import { EmptyState } from '../../shared/components/empty-state';
import { Spinner } from '../../shared/components/spinner';
import { PRIORITY_CLASS } from '../../shared/ui-classes';
import { DashboardService, DashboardStats } from './dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, EmptyState, Spinner],
  templateUrl: './dashboard.html',
})
export class DashboardPage implements OnInit {
  private api = inject(DashboardService);

  stats = signal<DashboardStats | null>(null);
  loading = signal(true);
  error = signal(false);

  priorityClass = PRIORITY_CLASS;
  priorityLabel = PRIORITY_LABEL;
  date = formatDate;
  overdue = isOverdue;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(false);
    this.api.getStats().subscribe({
      next: (s) => {
        this.stats.set(s);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  cards(s: DashboardStats) {
    return [
      { label: 'Total', value: s.total, tone: 'text-stone-900' },
      { label: 'Pendentes', value: s.pending, tone: 'text-stone-700' },
      { label: 'Em andamento', value: s.inProgress, tone: 'text-amber-700' },
      { label: 'Concluídas', value: s.done, tone: 'text-brand-700' },
      { label: 'Atrasadas', value: s.overdue, tone: s.overdue ? 'text-red-600' : 'text-stone-400' },
    ];
  }
}
