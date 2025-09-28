import { deleteFile } from '@common/helpers/deleteFile';
import { writeFile } from 'fs/promises';
import { basename, dirname, extname, join } from 'path';
import sharp from 'sharp';

export async function compressWithSlogan(
  imagePath: string,
  sloganPath: string,
  noSlogan?: boolean,
): Promise<void> {
  const imageFullPath = join(__dirname, '..', '..', '..', imagePath);

  const pipeline = sharp(imageFullPath);
  const { width: baseWidth, height: baseHeight } = await pipeline.metadata();

  if (!baseWidth || !baseHeight) {
    throw new Error('Failed to get base image dimensions');
  }

  const slogan = sharp(sloganPath);
  const { width: sloganWidth, height: sloganHeight } = await slogan.metadata();

  if (!sloganWidth || !sloganHeight) {
    throw new Error('Failed to get slogan image dimensions');
  }

  // Resize slogan to 20% of base image width
  const resizedSloganBuffer = await sharp(sloganPath)
    .resize({
      width: Math.floor(baseWidth),
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer();

  // Compose and convert to WebP
  let finalBuffer;
  if (noSlogan) {
    // If noSlogan is true, just convert the base image to WebP
    finalBuffer = await pipeline.webp({ quality: 80 }).toBuffer();
  } else {
    finalBuffer = await pipeline
      .composite([
        {
          input: resizedSloganBuffer,
          gravity: 'center',
        },
      ])
      .webp({ quality: 80 }) // Convert and compress to WebP
      .toBuffer();
  }

  // Build output path with .webp extension
  const outputWebPPath = join(
    dirname(imageFullPath),
    basename(imageFullPath, extname(imageFullPath)) + '.webp',
  );

  await writeFile(outputWebPPath, finalBuffer);
  await deleteFile(imageFullPath);
}
