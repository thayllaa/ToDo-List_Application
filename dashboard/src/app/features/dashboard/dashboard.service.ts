import { Injectable, inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Task, TaskStatus } from '../../core/models';
import { isOverdue, parseLocalDate } from '../../core/utils/date';
import { CategoriesService } from '../../features/categories/categories.service';
import { TaskService } from '../../features/tasks/services/task.service';

export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
  cancelled: number;
  overdue: number;
  completionRate: number;
  upcoming: Task[];
  byCategory: { name: string; count: number }[];
}

// Não há endpoint de resumo no backend, então as métricas saem da lista de tarefas.
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private tasksApi = inject(TaskService);
  private categoriesApi = inject(CategoriesService);

  getStats() {
    return forkJoin({
      tasks: this.tasksApi.list(),
      categories: this.categoriesApi.list(),
    }).pipe(
      map(({ tasks, categories }): DashboardStats => {
        const names = new Map(categories.map((c: any) => [c.id, c.name]));
        const count = (s: TaskStatus) => tasks.filter((t: any) => t.status === s).length;
        const done = count('completed');
        const cancelled = count('cancelled');
        const counted = tasks.length - cancelled;

        const upcoming = tasks
          .filter((t: any) => t.status !== 'completed' && t.status !== 'cancelled' && parseLocalDate(t.dueDate))
          .sort((a: any, b: any) => parseLocalDate(a.dueDate)!.getTime() - parseLocalDate(b.dueDate)!.getTime())
          .slice(0, 5);

        const byCat = new Map<string, number>();
        for (const t of tasks) {
          const name = String(
            t.category?.name ?? (t.categoryId ? names.get(t.categoryId) : undefined) ?? 'Sem categoria',
          );
          byCat.set(name, (byCat.get(name) ?? 0) + 1);
        }

        return {
          total: tasks.length,
          pending: count('pending'),
          inProgress: count('in_progress'),
          done,
          cancelled,
          overdue: tasks.filter((t: any) => isOverdue(t.status, t.dueDate)).length,
          completionRate: counted > 0 ? Math.round((done / counted) * 100) : 0,
          upcoming,
          byCategory: [...byCat]
            .map(([name, n]) => ({ name, count: n }))
            .sort((a, b) => b.count - a.count),
        };
      }),
    );
  }
}
