/* eslint-disable @unicorn/filename-case */
import { type TaskPriority, type TaskStatus } from '../core/models/index';

export const STATUS_CLASS: Record<TaskStatus, string> = {
  pending: 'bg-stone-100 text-stone-700',
  in_progress: 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-stone-200 text-stone-500',
};

export const PRIORITY_CLASS: Record<TaskPriority, string> = {
  low: 'bg-sky-100 text-sky-800',
  medium: 'bg-brand-100 text-brand-700',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-700',
};
