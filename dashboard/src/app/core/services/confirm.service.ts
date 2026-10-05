import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly options = signal<ConfirmOptions | null>(null);
  private resolver?: (value: boolean) => void;

  ask(options: ConfirmOptions): Promise<boolean> {
    this.options.set(options);
    return new Promise<boolean>((resolve) => (this.resolver = resolve));
  }

  answer(value: boolean) {
    this.options.set(null);
    this.resolver?.(value);
    this.resolver = undefined;
  }
}
