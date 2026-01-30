export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeId?: number | null; 
  dueDate?: string | null;    
  created_at?: string;
  priority?: string;
  order_index?: number;
}