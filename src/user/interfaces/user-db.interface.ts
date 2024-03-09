import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

export interface IUserDB {
  findAll(): Promise<User[]> | User[];
  findOne(id: string): Promise<User | null> | User;
  create(dto: CreateUserDto): Promise<User | null> | User;
  updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<User | null> | User;
  remove(id: string): Promise<User | null> | User;
}
