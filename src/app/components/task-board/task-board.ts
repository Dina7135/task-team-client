import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskCardComponent } from '../task-card/task-card';
import { TaskCommentsComponent } from "../task-comments/task-comments";

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TaskCardComponent, TaskCommentsComponent],
  templateUrl: './task-board.html',
  styleUrls: ['./task-board.css']
})
export class TaskBoardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  private allTasksSubject = new BehaviorSubject<Task[]>([]);

  todoTasks$ = this.allTasksSubject.pipe(map(tasks => tasks.filter(t => t.status === 'todo')));
  inProgressTasks$ = this.allTasksSubject.pipe(map(tasks => tasks.filter(t => t.status === 'in_progress')));
  doneTasks$ = this.allTasksSubject.pipe(map(tasks => tasks.filter(t => t.status === 'done')));

  projectId!: number;
  showCreateModal = signal(false);
  newTask: Partial<Task> = {};

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe(tasks => {
      this.allTasksSubject.next(tasks);
    });
  }

  openCreateModal(): void {
    this.newTask = {
      projectId: this.projectId,
      title: '',
      assigneeId: null,
      dueDate: '',
      status: 'todo',
      description: ''
    };
    this.showCreateModal.set(true);
  }

  onCreateTask(): void {
    const data = this.newTask;
    if (!data.title || !data.projectId) return;

    console.log('Creating task with data:', data);
    this.taskService.createTask(data).subscribe({
      next: (createdTask) => {
        this.allTasksSubject.next([...this.allTasksSubject.value, createdTask]);
        this.showCreateModal.set(false);
      },
      error: (error) => {
        console.error('Error creating task:', error);
        console.error('Response:', error.error);
      }
    });
  }

  onUpdateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(res => {
      const current = this.allTasksSubject.value.map(t => t.id === res.id ? res : t);
      this.allTasksSubject.next(current);
    });
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      const filtered = this.allTasksSubject.value.filter(t => t.id !== id);
      this.allTasksSubject.next(filtered);
    });
  }

  goBack(): void {
    this.router.navigate(['/team_dashboard']);
  }
  selectedTaskId = signal<number | null>(null);

  openComments(taskId: number): void {
    this.selectedTaskId.set(taskId);
  }

  closeComments(): void {
    this.selectedTaskId.set(null);
  }
}