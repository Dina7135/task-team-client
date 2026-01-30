import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskStatus } from '../models/task';
import { environment } from '../../environments/environment';
import { mapTaskFromServer, mapTaskToServer, mapTaskToServerForUpdate } from './task-mapper';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasksByProject(projectId: number): Observable<Task[]> {
    const params = new HttpParams().set('projectId', projectId.toString());
    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(tasks => tasks.map(task => mapTaskFromServer(task)))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<any>(this.apiUrl, mapTaskToServer(task)).pipe(
      map(serverTask => mapTaskFromServer(serverTask))
    );
  }

  updateTask(taskId: number, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}`, mapTaskToServerForUpdate(updates)).pipe(
      map(serverTask => mapTaskFromServer(serverTask))
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}