import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { API_URL } from '../../../core/config/api';
import { Task, TaskPayload } from '../../../core/models';
import { unwrapOne, unwrapPage } from '../../../core/utils/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private url = `${API_URL}/tasks`;

  private page(n: number) {
    // O backend limita perPage a 100 e usa 10 por padrão.
    const params = new HttpParams().set('page', n).set('perPage', 100);
    return this.http.get<any>(this.url, { params }).pipe(map((r) => unwrapPage<Task>(r)));
  }

  /** Busca todas as páginas e devolve uma lista única. */
  list() {
    return this.page(1).pipe(
      switchMap((first) => {
        if (first.lastPage <= 1) return of(first.items);
        const rest = Array.from({ length: first.lastPage - 1 }, (_, i) =>
          this.page(i + 2).pipe(map((p) => p.items)),
        );
        return forkJoin(rest).pipe(map((pages) => [...first.items, ...pages.flat()]));
      }),
    );
  }

  get(id: number) {
    return this.http.get<any>(`${this.url}/${id}`).pipe(map((r) => unwrapOne<Task>(r)));
  }

  create(payload: TaskPayload) {
    return this.http.post<any>(this.url, payload).pipe(map((r) => unwrapOne<Task>(r)));
  }

  update(id: number, payload: Partial<TaskPayload>) {
    return this.http.put<any>(`${this.url}/${id}`, payload).pipe(map((r) => unwrapOne<Task>(r)));
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  /** Aplica a diferença entre as tags atuais e as escolhidas no formulário. */
  syncTags(taskId: number, current: number[], next: number[]) {
    const calls = [
      ...next
        .filter((id) => !current.includes(id))
        .map((id) => this.http.post(`${this.url}/${taskId}/tags/${id}`, {})),
      ...current
        .filter((id) => !next.includes(id))
        .map((id) => this.http.delete(`${this.url}/${taskId}/tags/${id}`)),
    ];
    return calls.length ? forkJoin(calls) : of([]);
  }
}
