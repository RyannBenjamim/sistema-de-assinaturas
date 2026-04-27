export interface UserResponse {
  id: string;
  username: string;
  email: string;
  stripeCustomerId?: string | null;
  createdAt: string;
  updatedAt: string;
}