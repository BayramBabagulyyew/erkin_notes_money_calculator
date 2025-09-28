import { UserType } from '@common/enums';
import { UserModel } from '@modules/users/models/user.model';
import * as bcrypt from 'bcryptjs';

export class Seeder {
  public static async seedSuperUser() {
    const password = '123456';
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    await UserModel.findOrCreate({
      where: { email: 'test@gmail.com' },
      defaults: {
        email: 'test@gmail.com',
        password: hashedPass,
        fullName: 'Super Admin',
        type: UserType.ADMIN,
        isSuper: true,
      } as typeof UserModel.prototype, // or use the correct creation attributes type if available
    });
  }
}
