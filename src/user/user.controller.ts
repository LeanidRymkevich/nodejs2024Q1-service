import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Omit<User, 'password'> {
    return this.userService.create(dto);
  }

  @Get()
  findAll(): Omit<User, 'password'>[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Omit<User, 'password'> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    return this.userService.updatePassword(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.remove(id);
  }
}
