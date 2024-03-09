import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

export interface IUserDB {
  findAll(): User[];
  findOne(id: string): User | null;
  create(dto: CreateUserDto): User;
  updatePassword(id: string, dto: UpdatePasswordDto): User | null;
  remove(id: string): User | null;
}
