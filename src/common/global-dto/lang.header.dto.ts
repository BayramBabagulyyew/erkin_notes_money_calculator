import { Lang } from '@common/enums/lang.enum';
import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  @IsDefined()
  @IsOptional()
  @Expose({ name: 'lang' }) // required as headers are case insensitive
  lang: Lang;
}
