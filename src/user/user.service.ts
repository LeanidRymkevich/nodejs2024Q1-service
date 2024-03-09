import { Inject, Injectable } from '@nestjs/common';

import { IUserDB } from './interfaces/user-db.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('IUserDB') private storage: IUserDB) {}

  create(dto: CreateUserDto): User {
    return this.storage.create(dto);
  }

  findAll(): User[] {
    return this.storage.findAll();
  }

  findOne(id: string): User | null {
    return this.storage.findOne(id);
  }

  updatePassword(id: string, dto: UpdatePasswordDto): User | null {
    return this.storage.updatePassword(id, dto);
  }

  remove(id: string): User | null {
    return this.storage.remove(id);
  }
}
