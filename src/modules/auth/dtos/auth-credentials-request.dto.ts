import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
  })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  @MinLength(4)
  readonly password: string;

  @ApiProperty({
    example: 'test',
    required: true,
  })
  @IsUUID()
  @IsOptional()
  readonly token: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
  })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
  })
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
  })
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  @MinLength(4)
  readonly password: string;

  @ApiProperty({
    example: 'test',
    required: true,
  })
  @IsUUID()
  @IsOptional()
  readonly token: string;
}
