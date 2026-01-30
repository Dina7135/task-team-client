import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { LoginSuccess, Error } from '../../state/auth.actions';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule], // ודאי שכל אלו כאן
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // השורה הזו היא הקשר ל-CSS!
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onLoginSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const credentials = this.loginForm.getRawValue();
      const response = await firstValueFrom(this.authService.login(credentials));
      
      // Save token and user
      this.authService.setToken(response.token, response.user);
      
      // Dispatch success action
      this.store.dispatch(LoginSuccess({ user: response.user, token: response.token }));
      
      // Navigate to dashboard
      this.router.navigate(['/team_dashboard']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.store.dispatch(Error({ message: 'Login failed' }));
    }
  }
}