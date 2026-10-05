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
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-xl font-semibold text-stone-900">Dashboard</h1>
        <a routerLink="/tasks" class="btn-primary">Ver tarefas</a>
      </div>

      @if (loading()) {
        <app-spinner />
      } @else if (error()) {
        <div class="card flex flex-col items-center gap-3 p-8 text-center">
          <p class="text-sm text-stone-600">Não foi possível carregar o resumo das tarefas.</p>
          <button type="button" class="btn-secondary" (click)="load()">Tentar de novo</button>
        </div>
      } @else if (stats(); as s) {
        @if (s.total === 0) {
          <app-empty-state
            title="Nenhuma tarefa por aqui ainda"
            description="Crie sua primeira tarefa para acompanhar o progresso neste painel."
          >
            <a routerLink="/tasks" class="btn-primary">Criar tarefa</a>
          </app-empty-state>
        } @else {
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            @for (c of cards(s); track c.label) {
              <div class="card p-4">
                <p class="text-sm text-stone-500">{{ c.label }}</p>
                <p class="mt-1 text-3xl font-semibold" [class]="c.tone">{{ c.value }}</p>
              </div>
            }
          </div>

          <div class="card p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-stone-700">Progresso geral</span>
              <span class="text-stone-500">{{ s.completionRate }}% concluído</span>
            </div>
            <div class="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
              <div class="h-full rounded-full bg-brand-600" [style.width.%]="s.completionRate"></div>
            </div>
            @if (s.cancelled) {
              <p class="mt-2 text-xs text-stone-500">
                {{ s.cancelled }} tarefa(s) cancelada(s) não entram nesse cálculo.
              </p>
            }
          </div>

          <div class="grid gap-4 lg:grid-cols-3">
            <div class="card p-4 lg:col-span-2">
              <h2 class="font-semibold text-stone-800">Próximos prazos</h2>
              @if (s.upcoming.length) {
                <ul class="mt-3 divide-y divide-stone-100">
                  @for (t of s.upcoming; track t.id) {
                    <li class="flex items-center justify-between gap-3 py-2.5">
                      <div class="min-w-0">
                        <p class="truncate text-sm font-medium text-stone-800">{{ t.title }}</p>
                        <p class="text-xs" [class]="overdue(t.status, t.dueDate) ? 'text-red-600' : 'text-stone-500'">
                          {{ overdue(t.status, t.dueDate) ? 'Atrasada · ' : '' }}{{ date(t.dueDate) }}
                        </p>
                      </div>
                      <span class="shrink-0 rounded-full px-2 py-0.5 text-xs" [class]="priorityClass[t.priority]">
                        {{ priorityLabel[t.priority] }}
                      </span>
                    </li>
                  }
                </ul>
              } @else {
                <p class="mt-3 text-sm text-stone-500">Nenhuma tarefa pendente com prazo definido.</p>
              }
            </div>

            <div class="card p-4">
              <h2 class="font-semibold text-stone-800">Por categoria</h2>
              <ul class="mt-3 space-y-2">
                @for (c of s.byCategory; track c.name) {
                  <li class="flex items-center justify-between text-sm">
                    <span class="truncate text-stone-700">{{ c.name }}</span>
                    <span class="font-medium text-stone-900">{{ c.count }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      }
    </section>
  `,
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
