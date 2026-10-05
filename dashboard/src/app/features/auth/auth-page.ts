/* eslint-disable @unicorn/filename-case */
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { errorMessage } from '../../core/utils/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
})
export class AuthPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private http = inject(HttpClient);

  mode = signal<'login' | 'register'>('login');
  submitting = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  tab(m: 'login' | 'register') {
    return (
      'rounded py-2 text-sm font-medium transition ' +
      (this.mode() === m ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700')
    );
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.auth
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({              
        next: () => {
          this.toast.success('Login realizado.');
          this.router.navigate(['/dashboard']);
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível entrar. Confira e-mail e senha.')),
      });
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { email } = this.registerForm.getRawValue();
    this.auth
      .register(this.registerForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Conta criada. Agora é só entrar.');
          this.registerForm.reset();
          this.loginForm.patchValue({ email });
          this.mode.set('login');
        },
        error: (e) => this.toast.error(errorMessage(e, 'Não foi possível criar a conta.')),
      });
  }
}
