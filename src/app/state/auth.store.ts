import { User } from "../models/auth";

export interface AuthState {
  isLoggedIn: boolean
  user: User | null; 
  token: string | null;
  error: string | null; 
}
export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null
};