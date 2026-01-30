import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/comments`;

  getCommentsByTask(taskId: number): Observable<Comment[]> {
    const params = new HttpParams().set('taskId', taskId.toString());
    return this.http.get<Comment[]>(this.apiUrl, { params });
  }

  addComment(taskId: number, text: string): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, { taskId, body: text });
  }
}