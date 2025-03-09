import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
} from "../../../types/auth";
import { api } from "../../../utils/axios";

export const authService = {
  signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signin", credentials);
    return response.data;
  },

  signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", userData);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): { token: string; user: any } | null => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return null;
  },

  // For authenticated requests
  setAuthHeader: (token: string): void => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  clearAuthHeader: (): void => {
    delete api.defaults.headers.common["Authorization"];
  },
};

export default authService;
