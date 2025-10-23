import { UserModel } from '@db/models';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class Seeder {
  public static async seedSuperUser() {
    const password = '123456';
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    await UserModel.findOrCreate({
      where: { email: 'sexy@gmail.com' },
      defaults: {
        email: 'sexy@gmail.com',
        password: hashedPass,
        fullName: 'Super Admin',
        isSuper: true,
      } as any,
    });

    Logger.warn(`Super Admin seeded with email: test@gmail.com`);
  }
}
