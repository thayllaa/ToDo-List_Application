import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../../../core/config/api';
import { Tag } from '../../../core/models';
import { unwrapList, unwrapOne } from '../../../core/utils/http';

export interface TagPayload {
  name: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class TagService {
  private http = inject(HttpClient);
  private url = `${API_URL}/tags`;

  list() {
    return this.http.get<any>(this.url).pipe(map((r) => unwrapList<Tag>(r)));
  }

  create(payload: TagPayload) {
    return this.http.post<any>(this.url, payload).pipe(map((r) => unwrapOne<Tag>(r)));
  }

  update(id: number, payload: TagPayload) {
    return this.http.put<any>(`${this.url}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
