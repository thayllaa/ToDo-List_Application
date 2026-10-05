import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../../core/config/api';
import { Category } from '../../core/models';
import { unwrapList, unwrapOne } from '../../core/utils/http';

export interface CategoryPayload {
  name: string;
  color: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private url = `${API_URL}/categories`;

  list() {
    return this.http.get<any>(this.url).pipe(map((r) => unwrapList<Category>(r)));
  }

  create(payload: CategoryPayload) {
    return this.http.post<any>(this.url, payload).pipe(map((r) => unwrapOne<Category>(r)));
  }

  update(id: number, payload: CategoryPayload) {
    return this.http.put<any>(`${this.url}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
