import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teams-list.html',
  styleUrls: ['./teams-list.css']
})
export class TeamsListComponent implements OnInit {
  private teamService = inject(TeamService);
  private router = inject(Router);

  teams$!: Observable<Team[]>;
  
  isCreateModalOpen = signal(false);
  isAddMemberModalOpen = signal(false);
  
  newTeamName = signal('');
  selectedTeamId = signal<number | null>(null);
  newMemberId = signal('');
  
  statusMessage = signal('');
  statusType = signal<'success' | 'error' | ''>('');

  ngOnInit(): void {
    this.teamService.refreshTeams();
    this.teams$ = this.teamService.getTeams();
  }

  toggleCreateModal(): void {
    this.isCreateModalOpen.set(!this.isCreateModalOpen());
    this.newTeamName.set('');
  }

  onCreateTeam(): void {
    const name = this.newTeamName().trim();
    if (!name) return;

    this.teamService.createTeam({ name }).subscribe({
      next: () => {
        this.teamService.refreshTeams();
        this.toggleCreateModal();
      }
    });
  }

  openAddMemberModal(teamId: number): void {
    this.selectedTeamId.set(teamId);
    this.isAddMemberModalOpen.set(true);
  }

  closeAddMemberModal(): void {
    this.isAddMemberModalOpen.set(false);
    this.newMemberId.set('');
    this.statusMessage.set('');
    this.statusType.set('');
  }

  onConfirmAddMember(): void {
    const teamId = this.selectedTeamId();
    const memberIdValue = this.newMemberId();

    if (!teamId) {
      this.showError('Team ID is missing');
      return;
    }

    if (!memberIdValue || memberIdValue.toString().trim() === '') {
      this.showError('Please enter a User ID');
      return;
    }

    const userId = parseInt(memberIdValue.toString(), 10);
    if (isNaN(userId) || userId <= 0) {
      this.showError('User ID must be a valid positive number');
      return;
    }

    this.teamService.addTeamMember(teamId, userId).subscribe({
      next: () => {
        this.showSuccess(`User ${userId} added to team successfully!`);
        // עדכן את הכמות מיד
        this.teamService.refreshTeams();
        setTimeout(() => {
          this.closeAddMemberModal();
        }, 1500);
      },
      error: (error) => {
        const message = error?.error?.message || 'Failed to add member to team';
        this.showError(message);
      }
    });
  }

  private showSuccess(message: string): void {
    this.statusMessage.set(message);
    this.statusType.set('success');
  }

  private showError(message: string): void {
    this.statusMessage.set(message);
    this.statusType.set('error');
  }

  openTeam(teamId: number): void {
    this.router.navigate(['/team_dashboard/teams', teamId]);
  }
}