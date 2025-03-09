// src/features/tasks/taskService.ts
import axios from "axios";
import { Task } from "../../../types/task";

const API_URL = "http://localhost:3333/api/task";

export const taskService = {
  fetchTasks: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
  },

  createTask: async (task: Task): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${taskId}`);
  },
};
