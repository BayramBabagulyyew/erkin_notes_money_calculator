import { IsOptional } from 'class-validator';

export class FileResponseDto {
  id: number;

  name?: string;

  alternative_text: string;

  hash?: string;

  extension?: string;

  blurhash: string;

  mime?: string;

  @IsOptional()
  url_small_webp?: string;

  @IsOptional()
  url?: string;

  @IsOptional()
  url_large_webp?: string;

  @IsOptional()
  url_default: string;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  size?: number;
}

export class ImageResponseDto {
  id: number;

  alternative_text: string;

  blurhash: string;

  url_default: string;

  url?: string;
}
