import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { LoginSuccess, Error } from '../../state/auth.actions';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  async onRegisterSubmit() {
    if (this.registerForm.invalid) return;
    try {
      const userData = this.registerForm.getRawValue();
      const response = await firstValueFrom(this.authService.register(userData));
      this.store.dispatch(LoginSuccess({ user: response.user , token: response.token }));
      this.router.navigate(['/team_dashboard']);
    } catch (error: any) {
      this.store.dispatch(Error({ message: 'Registration failed' }));
    }
  }
}
