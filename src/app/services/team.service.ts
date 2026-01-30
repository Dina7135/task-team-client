import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team, CreateTeamRequest, TeamMember } from '../models/team';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/teams`;
  private teamsSubject = new BehaviorSubject<Team[]>([]);

  constructor() {
    this.refreshTeams();
  }

  getTeams(): Observable<Team[]> {
    return this.teamsSubject.asObservable();
  }

  refreshTeams(): void {
    this.http.get<Team[]>(this.endpoint).subscribe({
      next: (teams) => {
        this.teamsSubject.next(teams);
      }
    });
  }

  createTeam(teamData: CreateTeamRequest): Observable<Team> {
    return this.http.post<Team>(this.endpoint, teamData);
  }

  getTeamMembers(teamId: number): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.endpoint}/${teamId}/members`);
  }

  addTeamMember(teamId: number, userId: number, role: string = 'member'): Observable<any> {
    const url = `${this.endpoint}/${teamId}/members`;
    return this.http.post(url, { userId, role });
  }
}