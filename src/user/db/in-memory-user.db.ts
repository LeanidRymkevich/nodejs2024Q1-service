import { Injectable } from '@nestjs/common';

import { IUserDB } from '../interfaces/user-db.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

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
    
  }

  updatePassword(id: string, dto: UpdatePasswordDto): User {
    throw new Error('Method not implemented.');
  }

  remove(id: string): User | null {
    const user: User | null = this.findOne(id);

    if (user) delete this.storage[id];
    return user;
  }
}
