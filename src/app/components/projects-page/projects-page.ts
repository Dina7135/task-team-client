import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.css']
})
export class ProjectsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject.asObservable();
  
  teamId!: number;
  isModalOpen = signal(false);
  
  newProjectName = '';
  newProjectDesc = '';

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('teamId'));
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.projectService.getProjectsByTeam(this.teamId).subscribe(data => {
      this.projectsSubject.next(data);
    });
  }

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
    this.newProjectName = '';
    this.newProjectDesc = '';
  }

  onCreateProject(): void {
    if (!this.newProjectName.trim()) return;

    const payload = {
      teamId: this.teamId,
      name: this.newProjectName,
      description: this.newProjectDesc
    };

    this.projectService.createProject(payload).subscribe(newProject => {
      this.updateLocalState(newProject);
      this.toggleModal();
    });
  }

  private updateLocalState(newProject: Project): void {
    this.projectsSubject.pipe(take(1)).subscribe(current => {
      this.projectsSubject.next([...current, newProject]);
    });
  }

  goBack(): void {
    this.router.navigate(['/team_dashboard']);
  }

  openProject(projectId: number): void {
    this.router.navigate(['/team_dashboard/projects', projectId, 'tasks']);
  }
}