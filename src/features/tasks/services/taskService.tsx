import { Task } from "../../../types/task";
import { api } from "../../../utils/axios";

export const taskService = {
  fetchTasks: async (): Promise<Task[]> => {
    console.log(api);
    const response = await api.get("/task");
    return response.data.data;
  },

  createTask: async (task: Task): Promise<Task> => {
    const response = await api.post("/task", task);
    return response.data.data;
  },
  updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`${"/task"}/${taskId}`, updates);
    return response.data.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`${"/task"}/${taskId}`);
  },
};
