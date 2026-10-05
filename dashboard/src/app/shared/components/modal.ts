import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  host: { '(document:keydown.escape)': 'closed.emit()' },
  template: `
    <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" (click)="closed.emit()">
      <div
        class="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-xl bg-white shadow-xl sm:rounded-lg"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title()"
        (click)="$event.stopPropagation()"
      >
        <header class="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
          <h2 class="truncate text-lg font-semibold text-stone-900">{{ title() }}</h2>
          <button type="button" class="btn-ghost" (click)="closed.emit()" aria-label="Fechar">✕</button>
        </header>
        <div class="overflow-y-auto px-5 py-4">
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class Modal {
  title = input.required<string>();
  closed = output<void>();
}
