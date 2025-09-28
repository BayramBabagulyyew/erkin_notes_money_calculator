import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateUserPermissionDto {
  @ApiProperty({
    required: true,
    type: 'number',
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds: number[];

  // @ApiProperty({
  //   required: true,
  //   type: "number"
  // })
  // @Type(() => Number)
  // @IsNumber()
  // userId: number;
}
