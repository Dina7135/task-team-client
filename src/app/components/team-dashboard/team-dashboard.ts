import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../state/auth.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-dashboard.html',
  styleUrls: ['./team-dashboard.css'],
})
export class TeamDashboard {
  private store = inject(Store);
  currentUser$ = this.store.select(selectCurrentUser);
}