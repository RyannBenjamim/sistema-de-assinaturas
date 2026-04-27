import { UsersService } from "./users.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiResponse } from "../../common/interfaces/ApiResponse";
import { UserSummary } from "./interfaces/UserSummary";
import { UserResponse } from "./interfaces/UserResponse";
import { UserMapper } from "./mappers/user.mapper";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.create(createUserDto);
    return {
      message: "User created successfully.",
      data: UserMapper.toResponse(user),
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<UserSummary[]>> {
    const users = await this.usersService.findAll();
    return {
      message: "Users listed successfully.",
      data: users.map(UserMapper.toSummary),
    };
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.findOne(id);
    return {
      message: "User successfully searched.",
      data: UserMapper.toResponse(user),
    };
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ApiResponse<UserResponse>> {
    const deletedUser = await this.usersService.remove(id);
    return {
      message: "User successfully deleted.",
      data: UserMapper.toResponse(deletedUser),
    };
  }
}