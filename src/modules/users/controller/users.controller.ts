import { TOKEN_NAME } from '@common/constants';
import type { PaginationRequest } from '@common/libs/pagination';
import { PaginationParams } from '@common/libs/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { UUID } from 'crypto';

import { CurrentUser, SkipAuth } from '@modules/auth';
import { JustUser } from '@modules/auth/decorators/skip-auth.decorator';
import type { JwtPayload } from '@modules/auth/dtos';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQueryDto } from '../dto/query-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@ApiBearerAuth(TOKEN_NAME)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @SkipAuth()
  @Post()
  create(@Body() createDto: CreateUserDto, @I18n() i18n: I18nContext) {
    return this.usersService.create(createDto, i18n);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: PaginationRequest,
    @Query() _query: UserQueryDto,
  ) {
    return this.usersService.findAll(pagination, _query);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.usersService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: CreateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.usersService.update(id, updateUserDto, i18n);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID, @I18n() i18n: I18nContext) {
    return this.usersService.remove(id, i18n);
  }

  @JustUser()
  @Get('profile/me')
  getProfile(@CurrentUser() user: JwtPayload) {
    console.log('user', user);
    return this.usersService.getProfile(user.id);
  }

  @JustUser()
  @Patch('profile/me')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto,
    @I18n() i18n: I18nContext,
  ) {
    console.log('user', user);
    return this.usersService.updateProfile(user.id, dto, i18n);
  }
}
