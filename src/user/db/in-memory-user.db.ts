import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { IUserDB } from '../interfaces/user-db.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

const INITIAL_VERSION = 1;

@Injectable()
export class InMemoryUserDB implements IUserDB {
  private readonly storage: Record<string, User> = {};

  findAll(): User[] {
    return Object.values(this.storage);
  }

  findOne(id: string): User | null {
    return this.storage[id] || null;
  }

  create(dto: CreateUserDto): User {
    const id: string = randomUUID();
    const version: number = INITIAL_VERSION;
    const createdAt: number = Date.now();
    const updatedAt: number = createdAt;

    const user: User = {
      id,
      ...dto,
      version,
      createdAt,
      updatedAt,
    };

    this.storage[id] = user;
    return user;
  }

  updatePassword(id: string, dto: UpdatePasswordDto): User | null {
    const user: User | null = this.findOne(id);

    if (!user) return null;

    this.storage[id] = {
      ...user,
      password: dto.newPassword,
    };
    return user;
  }

  remove(id: string): User | null {
    const user: User | null = this.findOne(id);

    if (user) delete this.storage[id];
    return user;
  }
}
