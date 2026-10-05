/* eslint-disable @unicorn/filename-case */
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-bar',
  template: `
    @if (loading.isLoading()) {
      <div class="fixed inset-x-0 top-0 z-[60] h-1 overflow-hidden bg-brand-100" role="progressbar" aria-label="Carregando">
        <div class="h-full w-1/3 animate-pulse bg-brand-600"></div>
      </div>
    }
  `,
})
export class LoadingBar {
  loading = inject(LoadingService);
}
