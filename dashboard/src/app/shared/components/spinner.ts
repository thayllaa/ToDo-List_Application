import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="flex justify-center py-12" role="status" aria-label="Carregando">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"></div>
    </div>
  `,
})
export class Spinner {}
