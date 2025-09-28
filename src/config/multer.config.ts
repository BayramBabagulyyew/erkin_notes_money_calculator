import { MIME_TIPES } from '@common/constants';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}_${file.originalname}`;
      const fl = filename.replace(/\s/g, '_');
      cb(null, fl);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = MIME_TIPES;
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Invalid file type'), false);
    }
  },
};
