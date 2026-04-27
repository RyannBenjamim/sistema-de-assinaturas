import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infra/database/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const userResponseSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  email: true,
  stripeCustomerId: true,
  createdAt: true,
  updatedAt: true,
});

type UserResponseFromPrisma = Prisma.UserGetPayload<{
  select: typeof userResponseSelect;
}>;

const userSummarySelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  email: true,
});

type UserSummaryFromPrisma = Prisma.UserGetPayload<{
  select: typeof userSummarySelect;
}>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto
  ): Promise<UserResponseFromPrisma> {
    const existingEmail = await this.prisma.user.findUnique({ 
      where: { email: createUserDto.email } 
    });

    if (existingEmail) {
      throw new ConflictException('This email address has already been registered.');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const modifiedUser = {
      ...createUserDto, 
      password: hashPassword,
    }

    return this.prisma.user.create({ 
      data: modifiedUser,
      select: userResponseSelect
    });
  }

  async findAll(): Promise<UserSummaryFromPrisma[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: userSummarySelect,
    });
  }

  async findOne(id: string): Promise<UserResponseFromPrisma> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: userResponseSelect
    });
    if (!user) throw new NotFoundException("User not found.");
    return user;
  }

  async remove(id: string): Promise<UserResponseFromPrisma> {
    return this.prisma.user.delete({ 
      where: { id },
      select: userResponseSelect
    });
  }
}