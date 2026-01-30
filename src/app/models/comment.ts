export interface Comment {
  id: number;
  taskId: number;
  userId: number;
  body: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}