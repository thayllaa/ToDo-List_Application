import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../../../core/config/api';
import { Subtask } from '../../../core/models';
import { unwrapList, unwrapOne } from '../../../core/utils/http';

@Injectable({ providedIn: 'root' })
export class SubtaskService {
  private http = inject(HttpClient);
  private url = (taskId: number) => `${API_URL}/tasks/${taskId}/subtasks`;

  list(taskId: number) {
    return this.http.get<any>(this.url(taskId)).pipe(map((r) => unwrapList<Subtask>(r)));
  }

  create(taskId: number, payload: { title: string }) {
    return this.http.post<any>(this.url(taskId), payload).pipe(map((r) => unwrapOne<Subtask>(r)));
  }

  update(taskId: number, id: number, payload: Partial<Subtask>) {
    return this.http.put<any>(`${this.url(taskId)}/${id}`, payload);
  }

  remove(taskId: number, id: number) {
    return this.http.delete(`${this.url(taskId)}/${id}`);
  }
}
