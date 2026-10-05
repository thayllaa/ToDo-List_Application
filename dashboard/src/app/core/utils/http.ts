import { HttpErrorResponse } from '@angular/common/http';

/**
 * As respostas do backend vêm embrulhadas (ApiResponse) e, nas listas paginadas,
 * dentro de { meta, data }. Aqui descemos pelas chaves "data" até achar o conteúdo.
 */
export function unwrapPage<T>(res: any): { items: T[]; lastPage: number } {
  let cur = res;
  while (cur && typeof cur === 'object' && !Array.isArray(cur)) {
    if (Array.isArray(cur.data)) {
      return { items: cur.data as T[], lastPage: Number(cur.meta?.lastPage ?? 1) || 1 };
    }
    if ('data' in cur) cur = cur.data;
    else break;
  }
  return { items: Array.isArray(cur) ? (cur as T[]) : [], lastPage: 1 };
}

export function unwrapList<T>(res: any): T[] {
  return unwrapPage<T>(res).items;
}

export function unwrapOne<T>(res: any): T {
  let cur = res;
  while (cur && typeof cur === 'object' && !Array.isArray(cur) && 'data' in cur) {
    cur = cur.data;
  }
  return cur as T;
}

export function errorMessage(err: unknown, fallback = 'Algo deu errado. Tente novamente.'): string {
  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (Array.isArray(body?.errors) && body.errors.length) {
      return body.errors.map((e: any) => e.message).join(' ');
    }
    if (typeof body?.message === 'string') return body.message;
    return fallback;
  }
  return err instanceof Error ? err.message : fallback;
}
