export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  access_token: string;
}
