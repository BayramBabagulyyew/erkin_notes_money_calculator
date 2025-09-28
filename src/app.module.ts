import { DatabaseModule } from '@db/sequelize-conf';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'tk',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    UsersModule,
    AuthModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
