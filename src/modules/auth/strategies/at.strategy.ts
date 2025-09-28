import { IEnvironment } from '@common/interfaces';
import { UsersService } from '@modules/users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dtos';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly userService: UsersService,
  ) {
    const accessTokenSecret = config.get<IEnvironment['ACCESS_TOKEN_SECRET']>('ACCESS_TOKEN_SECRET');
    if (!accessTokenSecret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined in configuration');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.userService.checkUserNameExist(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
