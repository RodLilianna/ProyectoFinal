export interface LoginCredentials {
  email: string;
  password: string;
  hasError: boolean;
  error: string | null;
}
