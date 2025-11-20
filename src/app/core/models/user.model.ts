export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

