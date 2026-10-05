// Espelha os models do backend Adonis (task.ts, category.ts, tag.ts, subtask.ts, comment.ts).

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export const TASK_STATUSES: TaskStatus[] = ['pending', 'in_progress', 'completed', 'cancelled'];
export const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

export const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente',
};

export interface User {
  id: number;
  username: string | null;
  email: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
  color?: string | null;
  icon?: string | null;
}

export interface Tag {
  id: number;
  name: string;
  color?: string | null;
}

export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface TaskComment {
  id: number;
  content: string;
  createdAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  completedAt?: string | null;
  categoryId?: number | null;
  category?: Category | null;
  tags?: Tag[];
}

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  categoryId: number;
}

export interface TaskFiltersValue {
  search: string;
  status: TaskStatus | '';
  priority: TaskPriority | '';
  categoryId: number | null;
}

export function toPayload(t: Task): TaskPayload {
  return {
    title: t.title,
    description: t.description ?? '',
    status: t.status,
    priority: t.priority,
    dueDate: t.dueDate ? t.dueDate.slice(0, 10) : null,
    categoryId: (t.categoryId ?? t.category?.id) as number,
  };
}
