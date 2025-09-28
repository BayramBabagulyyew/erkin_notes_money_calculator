import { ResponseUserDto } from '../dto/response-user.dto';
import { UserModel } from '../models/user.model';

export class UserMapper {
  public static async toClient(model: UserModel): Promise<ResponseUserDto> {
    const dto = new ResponseUserDto();
    dto.id = model.id ?? null;
    dto.createdAt = model.createdAt ?? null;
    dto.updatedAt = model.updatedAt ?? null;
    dto.email = model.email ?? null;
    dto.fullName = model.fullName ?? null;
    dto.notify = model.notify ?? false;
    return dto;
  }
}
