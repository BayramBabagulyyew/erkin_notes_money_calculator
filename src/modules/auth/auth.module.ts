import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService, TokenService } from './services';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtAdminGuard } from '@modules/auth/guards/jwt-admin.guard';

@Module({
  imports: [JwtModule.register({}), PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    TokenService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAdminGuard,
    },
  ],
})
export class AuthModule {}
