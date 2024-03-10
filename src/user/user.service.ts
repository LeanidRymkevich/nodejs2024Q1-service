import { Inject, Injectable } from '@nestjs/common';

import { IUserDB } from './interfaces/user-db.interface';
import { UserResponse } from './types/user-response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { omitUserPassword } from '../utils/user-utils';
import { UserWrongPasswordError } from './user-wrong-password.error';

@Injectable()
export class UserService {
  constructor(@Inject('IUserDB') private storage: IUserDB) {}

  async create(dto: CreateUserDto): Promise<UserResponse | null> {
    const user: User | null = await this.storage.create(dto);
    return omitUserPassword(user);
  }

  async findAll(): Promise<UserResponse[]> {
    const users: User[] = await this.storage.findAll();
    return users.map((user: User): UserResponse => omitUserPassword(user));
  }

  async findOne(id: string): Promise<UserResponse | null> {
    const user: User | null = await this.storage.findOne(id);
    return omitUserPassword(user);
  }

  async updatePassword(
    id: string,
    dto: UpdatePasswordDto
  ): Promise<UserResponse | null> {
    let user: User | null = await this.storage.findOne(id);

    if (!user) return null;
    if (user.password !== dto.oldPassword) {
      throw new UserWrongPasswordError();
    }

    user = await this.storage.updatePassword(id, dto);
    return omitUserPassword(user);
  }

  async remove(id: string): Promise<UserResponse | null> {
    const user: User | null = await this.storage.remove(id);
    return omitUserPassword(user);
  }
}
