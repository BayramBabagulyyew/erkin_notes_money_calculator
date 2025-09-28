import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IEnvironment } from '@common/interfaces';
import { ConfigService } from '@nestjs/config';

import { StrategyOptionsWithRequest } from 'passport-jwt';
@Injectable()

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<IEnvironment['REFRESH_TOKEN_SECRET']>(
        'REFRESH_TOKEN_SECRET',
      ),
      passReqToCallback: true,
      ignoreExpiration: false,
    } as StrategyOptionsWithRequest);
  }

  validate(req: any, payload: any): any {
    const refreshToken = req?.headers?.authorization
      .replace('Bearer', '')
      .trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
