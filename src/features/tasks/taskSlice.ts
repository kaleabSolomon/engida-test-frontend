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
      });
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
