import { UserModel } from '@db/models';
import { ResponseUserDto } from '../dto/response-user.dto';

export class UserMapper {
  public static async toClient(model: UserModel): Promise<ResponseUserDto> {
    const dto = new ResponseUserDto();
    dto.id = model.id ?? null;
    dto.createdAt = model.createdAt ?? null;
    dto.updatedAt = model.updatedAt ?? null;
    dto.email = model.dataValues.email ?? null;
    dto.fullName = model.dataValues.fullName ?? null;
    return dto;
  }
}
