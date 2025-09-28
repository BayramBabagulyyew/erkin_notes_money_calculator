import { PaginationDto } from '@common/global-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends PaginationDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @ApiProperty({ type: 'boolean', required: false, default: false })
  @Type(() => String)
  @IsString()
  @IsOptional()
  admin: string;
}
