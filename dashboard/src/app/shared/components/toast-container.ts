/* eslint-disable @unicorn/filename-case */
import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <div
      class="fixed bottom-4 right-4 z-[70] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      aria-live="polite"
    >
      @for (t of toast.toasts(); track t.id) {
        <div
          class="flex items-start gap-3 rounded-md px-4 py-3 text-sm text-white shadow-lg"
          [class]="styles[t.type]"
          role="status"
        >
          <span class="flex-1">{{ t.message }}</span>
          <button type="button" class="opacity-80 hover:opacity-100" (click)="toast.dismiss(t.id)" aria-label="Fechar aviso">
            ✕
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainer {
  toast = inject(ToastService);
  styles = {
    success: 'bg-brand-700',
    error: 'bg-red-600',
    info: 'bg-stone-800',
  };
}
