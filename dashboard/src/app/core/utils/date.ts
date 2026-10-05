/** Lê "yyyy-MM-dd" (ou ISO) como data local, sem o deslocamento de fuso. */
export function parseLocalDate(value?: string | null): Date | null {
  if (!value) return null;
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function formatDate(value?: string | null): string {
  const d = parseLocalDate(value);
  return d ? d.toLocaleDateString('pt-BR') : '';
}

export function isOverdue(status: string, dueDate?: string | null): boolean {
  const due = parseLocalDate(dueDate);
  if (!due || status === 'completed' || status === 'cancelled') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
