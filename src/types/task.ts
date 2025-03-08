export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  isDeleted: boolean;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export enum TaskStatus {
  todo = "TODO",
  inProgress = "IN_PROGRESS",
  done = "DONE",
}
