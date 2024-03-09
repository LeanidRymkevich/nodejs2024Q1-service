import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  NotFoundException,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './types/user-response.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userService.create(dto);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user: UserResponse | null = await this.userService.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user: UserResponse | null = await this.userService.updatePassword(
      id,
      dto,
    );
    if (!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const user: UserResponse | null = await this.userService.remove(id);
    if (!user) throw new NotFoundException();
  }
}
