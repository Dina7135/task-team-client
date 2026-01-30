import { Task } from '../models/task';

export function mapTaskFromServer(serverTask: any): Task {
  return {
    id: serverTask.id,
    projectId: serverTask.project_id,
    title: serverTask.title,
    description: serverTask.description,
    status: serverTask.status,
    assigneeId: serverTask.assignee_id,
    dueDate: serverTask.due_date,
    created_at: serverTask.created_at,
    priority: serverTask.priority,
    order_index: serverTask.order_index
  };
}

export function mapTaskToServer(clientTask: Partial<Task>): any {
  const serverTask: any = {};
  if (clientTask.projectId !== undefined) serverTask.projectId = clientTask.projectId;
  if (clientTask.title !== undefined) serverTask.title = clientTask.title;
  if (clientTask.description !== undefined) serverTask.description = clientTask.description;
  if (clientTask.status !== undefined) serverTask.status = clientTask.status;
  if (clientTask.assigneeId !== undefined) serverTask.assigneeId = clientTask.assigneeId;
  if (clientTask.dueDate !== undefined) serverTask.dueDate = clientTask.dueDate;
  if (clientTask.priority !== undefined) serverTask.priority = clientTask.priority;
  if (clientTask.order_index !== undefined) serverTask.order_index = clientTask.order_index;
  return serverTask;
}

export function mapTaskToServerForUpdate(clientTask: Partial<Task>): any {
  const serverTask: any = {};
  if (clientTask.title !== undefined) serverTask.title = clientTask.title;
  if (clientTask.description !== undefined) serverTask.description = clientTask.description;
  if (clientTask.status !== undefined) serverTask.status = clientTask.status;
  if (clientTask.assigneeId !== undefined) serverTask.assignee_id = clientTask.assigneeId;
  if (clientTask.dueDate !== undefined) serverTask.due_date = clientTask.dueDate;
  if (clientTask.priority !== undefined) serverTask.priority = clientTask.priority;
  if (clientTask.order_index !== undefined) serverTask.order_index = clientTask.order_index;
  return serverTask;
}
