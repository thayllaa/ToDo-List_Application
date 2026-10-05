/* eslint-disable @unicorn/filename-case */
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LucideLogOut } from '@lucide/angular';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideLogOut],
  templateUrl: './main-layout.html',
})
export class MainLayout implements OnInit {
  auth = inject(AuthService);
  open = signal(false);
  

  links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/tasks', label: 'Tarefas' },
    { path: '/categories', label: 'Categorias' },
    { path: '/profile', label: 'Perfil' },
  ];

  ngOnInit() {
    if (!this.auth.user()) this.auth.me().subscribe({ error: () => { } });
  }
}
