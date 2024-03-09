import { Inject, Injectable } from '@nestjs/common';

import { IUserDB } from './interfaces/user-db.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { omitUserPassword } from '../utils/user-utils';

@Injectable()
export class UserService {
  constructor(@Inject('IUserDB') private storage: IUserDB) {}

  create(dto: CreateUserDto): Omit<User, 'password'> {
    return omitUserPassword(this.storage.create(dto));
  }

  findAll(): Omit<User, 'password'>[] {
    return this.storage
      .findAll()
      .map((user: User): Omit<User, 'password'> => omitUserPassword(user));
  }

  findOne(id: string): Omit<User, 'password'> | null {
    return omitUserPassword(this.storage.findOne(id));
  }

  updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Omit<User, 'password'> | null {
    return omitUserPassword(this.storage.updatePassword(id, dto));
  }

  remove(id: string): Omit<User, 'password'> | null {
    return omitUserPassword(this.storage.remove(id));
  }
}
