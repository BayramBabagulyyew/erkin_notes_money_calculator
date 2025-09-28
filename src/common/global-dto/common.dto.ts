import { FileTypeEnum } from '@common/enums';

export abstract class CommonDto {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  fileType: FileTypeEnum;
  file: string;
  thumbnail?: string;
  duration?: number;
}
