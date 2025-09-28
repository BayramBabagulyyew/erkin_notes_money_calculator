import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ type: 'boolean', required: false })
  @IsOptional()
  @IsBoolean()
  notify?: boolean;
}
