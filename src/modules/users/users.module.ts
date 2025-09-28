import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { userProvider } from './providers/user.provider';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProvider],
  exports: [UsersService],
})
export class UsersModule {}
