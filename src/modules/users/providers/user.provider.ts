import { UserModel } from '../models/user.model';

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserModel,
  },
];
