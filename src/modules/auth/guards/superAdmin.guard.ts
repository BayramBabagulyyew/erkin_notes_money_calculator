import { UserModel } from '@modules/users/models/user.model';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  /**
   * Check if the user has permission to access the resource
   * @param context {ExecutionContext}
   * @returns{boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await UserModel.findByPk(user.id);
    return !!dbUser && !!dbUser.isSuper;
  }
}
