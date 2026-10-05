/* eslint-disable @unicorn/filename-case */
import { Component, inject } from '@angular/core';
import { ConfirmService } from '../../core/services/confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  host: { '(document:keydown.escape)': 'confirm.options() && confirm.answer(false)' },
  template: `
    @if (confirm.options(); as o) {
      <div
        class="fixed inset-0 z-[65] flex items-center justify-center bg-black/40 p-4"
        (click)="confirm.answer(false)"
      >
        <div
          class="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
          role="alertdialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <h2 class="text-lg font-semibold text-stone-900">{{ o.title }}</h2>
          <p class="mt-2 text-sm text-stone-600">{{ o.message }}</p>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-secondary" (click)="confirm.answer(false)">Cancelar</button>
            <button
              type="button"
              [class]="o.danger === false ? 'btn-primary' : 'btn-danger'"
              (click)="confirm.answer(true)"
            >
              {{ o.confirmText ?? 'Confirmar' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialog {
  confirm = inject(ConfirmService);
}
