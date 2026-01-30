import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogOut } from '../../state/auth.actions';
import { selectIsLoggedIn, selectCurrentUser } from '../../state/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectCurrentUser);

  onLogout(): void {
    this.store.dispatch(LogOut());
    this.router.navigate(['/login']);
  }
}