export type Role = "ADMIN" | "USER";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  passwordHash: string;
  role?: Role;
}

export type AuthResponse = 
  | { success: true }
  | { error: string };
