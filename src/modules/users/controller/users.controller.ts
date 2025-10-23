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
import { PaginationParams, type PaginationRequest } from '../../../common/libs/pagination';

import { TOKEN_NAME } from '@common/constants';
import { CurrentUser, SkipAuth } from '@modules/auth';
import { type JwtPayload } from '@modules/auth/dtos';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQueryDto } from '../dto/query-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersService } from '../services/users.service';

// @ApiTags('users')
@ApiBearerAuth(TOKEN_NAME)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @SkipAuth()
  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: PaginationRequest<UserQueryDto>,
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
    @Body() updateUserDto: CreateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }

  @Get('profile/me')
  getProfile(@CurrentUser() user: JwtPayload) {
    console.log('user', user);
    return this.usersService.getProfile(user.id);
  }

  @Patch('profile/me')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto
  ) {
    console.log('user', user);
    return this.usersService.updateProfile(user.id, dto);
  }
}
