import { HashHelper as Hash, HashHelper } from '@common/helpers';
import { Mailer } from '@common/helpers/sendMail';
import { UserModel } from '@db/models';
import { UsersService } from '@modules/users/services/users.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, TokenDto } from '../dtos';
import { LoginDto, RegisterDto } from '../dtos/auth-credentials-request.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  // private myCache: NodeCache;
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
  ) {
    // this.myCache = new NodeCache();
  }

  public async generateTokenForLogin() {
    const generatedUuid = uuidv4();
    // this.myCache.set(generatedUuid, 0, 600);
    return generatedUuid;
  }

  async register(dto: RegisterDto) {
    // const cached: number = this.myCache.take(dto.token);
    // if (!cached) {
    //   throw new ForbiddenException('Need login token!');
    // }
    const user: UserModel = await this.userService.getUserByUsername(
      dto.email,

    );

    if (user) {
      throw new ConflictException();
    }
    const createdUser = await this.userService.create({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      isSuper: false,
      notify: true,
    });
    if (!createdUser) {
      throw new NotFoundException('User not created');
    }
    const payload: JwtPayload = {
      id: createdUser.id,
      email: createdUser.dataValues.email,
    };
    const waitingToken: Promise<TokenDto> =
      this.tokenService.generateAuthToken(payload);

    const token: TokenDto = await waitingToken;

    return token;
  }

  public async login(dto: LoginDto) {
    // const cached: number = this.myCache.take(dto.token);
    // if (!cached) {
    //   throw new ForbiddenException('Need login token!');
    // }
    const user: UserModel = await this.userService.getUserByUsername(
      dto.email,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.dataValues.email,
    };
    const waitingToken: Promise<TokenDto> =
      this.tokenService.generateAuthToken(payload);

    const token: TokenDto = await waitingToken;
    return token
  }

  public async adminLogin(dto: LoginDto) {
    // const cached: number = this.myCache.take(dto.token);
    // if (!cached) {
    //   throw new ForbiddenException('Need login token!');
    // }
    const user: UserModel = await this.userService.getUserByUsername(
      dto.email,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await HashHelper.compare(dto.password, user.password);

    if (!passwordMatch) {
      // if (cached > 5) {
      //   throw new ForbiddenException(
      //     'If your username is correct then check your belongs email!',
      //   );
      // }
      // this.myCache.set(dto.token, cached + 1, 600);
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.dataValues.email,
    };
    const waitingToken: Promise<TokenDto> =
      this.tokenService.generateAuthToken(payload);

    const token: TokenDto = await waitingToken;

    return token;
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.getUserByUsername(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPass = Math.floor(1000 + Math.random() * 9000).toString();

    const hashed = await Hash.encrypt(newPass);
    const pass = await user.update({ password: hashed });

    await Mailer.sendEmailMessage(
      user.email,
      'Password Reset',
      `Your new password: ${newPass}`,
    );
    return true;
  }
}
