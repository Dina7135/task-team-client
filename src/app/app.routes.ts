import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { authGuard } from './guards/auth.guard';
import { TeamDashboard } from './components/team-dashboard/team-dashboard';
import { TeamsListComponent } from './components/teams-list/teams-list';
import { ProjectsPageComponent } from './components/projects-page/projects-page';
import { TaskBoardComponent } from './components/task-board/task-board';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'team_dashboard',
    component: TeamDashboard,
    canActivate: [authGuard],
    children: [
      { path: '', component: TeamsListComponent },
      { path: 'teams/:teamId', component: ProjectsPageComponent },
      { path: 'projects/:projectId/tasks', component: TaskBoardComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];