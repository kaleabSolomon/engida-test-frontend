import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignInRequest, SignUpRequest, AuthResponse } from "../../types/auth";
import authService from "./services/authService";

// Define the shape of the auth state
interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: SignInRequest, thunkAPI) => {
    try {
      const response = await authService.signIn(credentials);

      // Store the token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Set the auth header for future requests
      authService.setAuthHeader(response.token);

      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Sign in failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpRequest, thunkAPI) => {
    try {
      const response = await authService.signUp(userData);

      // Store the token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Set the auth header for future requests
      authService.setAuthHeader(response.token);

      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Sign up failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
  authService.clearAuthHeader();
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
