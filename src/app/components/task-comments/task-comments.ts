import { Component, OnInit, inject, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../state/auth.selectors';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-task-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-comments.html',
  styleUrls: ['./task-comments.css']
})
export class TaskCommentsComponent implements OnInit {
  private commentService = inject(CommentService);
  private authStore = inject(Store);

  taskId = input.required<number>();
  close = output();

  comments = signal<Comment[]>([]);
  newCommentText = signal('');
  
  currentUser = computed(() => this.authStore.selectSignal(selectCurrentUser)());

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentService.getCommentsByTask(this.taskId()).subscribe({
      next: (data) => this.comments.set(data)
    });
  }

  sendComment(): void {
    const text = this.newCommentText().trim();
    if (!text) return;

    this.commentService.addComment(this.taskId(), text).subscribe({
      next: (comment) => {
        this.comments.update(prev => [...prev, comment]);
        this.newCommentText.set('');
      }
    });
  }
}