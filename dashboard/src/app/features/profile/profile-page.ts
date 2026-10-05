/* eslint-disable @unicorn/filename-case */
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { errorMessage } from '../../core/utils/http';
import { Spinner } from '../../shared/components/spinner';

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, Spinner],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  auth = inject(AuthService);

  saving = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8)]], // vazio é válido: significa "não alterar"
  });

  constructor() {
    effect(() => {
      const u = this.auth.user();
      if (u) this.form.reset({ username: u.username ?? '', email: u.email ?? '', password: '' });
    });
  }

  submit() {
    const user = this.auth.user();
    if (!user) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.form.getRawValue();
    const payload = { username, email, password };

    this.saving.set(true);
    this.auth
      .updateProfile(user.id, payload)
      .pipe(
        switchMap(() => this.auth.me()),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: () => {
          this.form.controls.password.reset('');
          this.toast.success('Perfil atualizado.');
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível atualizar o perfil.')),
      });
  }
}
