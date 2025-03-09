import { Task } from "../../../types/task";
import { api } from "../../../utils/axios";

const API_URL = "http://localhost:3333/api/task";

export const taskService = {
  fetchTasks: async (): Promise<Task[]> => {
    const response = await api.get(API_URL);
    return response.data.data;
  },

  createTask: async (task: Task): Promise<Task> => {
    const response = await api.post(API_URL, task);
    return response.data.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`${API_URL}/${taskId}`);
  },
};
