// auth-response.model.ts
export interface AuthResponse {
    id: string;
    firstName: string | null;
    lastName: string | null;
    userName: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    hasError: boolean;
    error: string | null;
    token: string;
  }
  