import { User } from '../user/entities/user.entity';

export const omitUserPassword = (
  user: User | null
): Omit<User, 'password'> | null => {
  if (!user) return null;

  const result: User = { ...user };
  delete result['password'];

  return result;
};
