/* eslint-disable @unicorn/filename-case */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="flex flex-col items-center rounded-lg border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
      <div class="text-4xl" aria-hidden="true">{{ icon() }}</div>
      <h3 class="mt-3 text-base font-semibold text-stone-800">{{ title() }}</h3>
      @if (description()) {
        <p class="mt-1 max-w-sm text-sm text-stone-500">{{ description() }}</p>
      }
      <div class="mt-4 empty:hidden"><ng-content /></div>
    </div>
  `,
})
export class EmptyState {
  title = input.required<string>();
  description = input('');
  icon = input('📋');
}
