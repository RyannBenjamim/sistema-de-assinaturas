import { User } from "@prisma/client";
import { UserResponse } from "../interfaces/UserResponse";
import { UserSummary } from "../interfaces/UserSummary";

export class UserMapper {
  static toResponse(user: Omit<User, 'password'>): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      stripeCustomerId: user.stripeCustomerId,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  static toSummary(
    user: Pick<User, "id" | "username" | "email">
  ): UserSummary {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}