import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from './shared/components/confirm-dialog';
import { LoadingBar } from './shared/components/loading-bar';
import { ToastContainer } from './shared/components/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBar, ToastContainer, ConfirmDialog],
  templateUrl: './app.html',
})
export class App { }
