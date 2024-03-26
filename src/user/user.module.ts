import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserDB } from './db/in-memory-user.db';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserDB',
      useClass: InMemoryUserDB,
    },
  ],
})
export class UserModule {}
