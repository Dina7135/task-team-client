import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HeaderComponent } from './components/header/header';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { RestoreTokenSuccess } from './state/auth.actions';
import { User } from './models/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('task-team-client');
  private authService = inject(AuthService);
  private store = inject(Store);

  ngOnInit() {
    const token = this.authService.getToken();
    const user: User | undefined = this.authService.getUser();
    if (token) {
      this.store.dispatch(RestoreTokenSuccess({ token, user }));
    }
  }
}

