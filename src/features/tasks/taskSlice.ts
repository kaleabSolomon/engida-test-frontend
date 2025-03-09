/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "../../types/task";
import { taskService } from "./services/taskService";

// Initial state
const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await taskService.fetchTasks();
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Task, { rejectWithValue }) => {
    try {
      return await taskService.createTask(task);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Task creation failed"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(taskId);
      return taskId; // Return the ID so we can remove it from state
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

export const updateTask = createAsyncThunk<
  Task,
  { taskId: string; updates: Partial<Task> }, // Argument type (taskId and updates)
  { rejectValue: string } // Error handling
>("tasks/updateTask", async ({ taskId, updates }, { rejectWithValue }) => {
  try {
    const updatedTask = await taskService.updateTask(taskId, updates);
    return updatedTask;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update task"
    );
  }
});
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        state.tasks.push(action.payload); // Add new task to state
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask }; // Merge updates
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload ? { ...task, isDeleted: true } : task
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
