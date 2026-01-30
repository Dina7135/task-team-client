import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCardComponent {
  private taskService = inject(TaskService);
   
  task = input.required<Task>();
  
  update = output<Task>();
  delete = output<number>();
  comments = output<number>();

  isEditing = signal(false);
  editModel = signal<Task>({} as Task);
  isUpdatingStatus = signal(false);

  statusOptions: TaskStatus[] = ['todo', 'in_progress', 'done'];
  statusLabels: Record<TaskStatus, string> = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'done': 'Done'
  };

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.updateStatus(selectElement.value as TaskStatus);
  }

  toggleEdit(): void {
    this.editModel.set({ ...this.task() });
    this.isEditing.set(true);
  }

  updateEditField(field: keyof Task, value: any): void {
    const current = this.editModel();
    this.editModel.set({ ...current, [field]: value });
  }

  cancel(): void {
    this.isEditing.set(false);
  }

  save(): void {
    this.taskService.updateTask(this.editModel().id, this.editModel()).subscribe({
      next: (res) => {
        this.update.emit(res);
        this.isEditing.set(false);
      }
    });
  }

  updateStatus(newStatus: TaskStatus): void {
    this.isUpdatingStatus.set(true);
    const updatedTask = { ...this.task(), status: newStatus };
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
      next: (res) => {
        this.update.emit(res);
        this.isUpdatingStatus.set(false);
      },
      error: () => {
        this.isUpdatingStatus.set(false);
      }
    });
  }
}