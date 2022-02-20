import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { checkPassword } from '../../utils/checkPassword';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { SilentError } from '../../utils/errors/SilentError';
import { AdminUserService } from '../admin-user/admin-user.service';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { ClassicUser } from '../classic-user/entities/classic-user.entity';
import { UserService } from '../user/user.service';
import { LoginInput } from './inputs/login.input';

export interface JWTPayload {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminUserService: AdminUserService,
    private jwtService: JwtService,
  ) {}

  async login(params: LoginInput): Promise<JWTPayload> {
    try {
      const user = await this.userService.findOne({
        email: params.email,
      });

      if (
        !user ||
        !(user instanceof ClassicUser) ||
        !checkPassword(params.password, user.password)
      ) {
        throw new UserInputError(ErrorMessage.WRONG_CREDENTIALS);
      }

      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new SilentError(ErrorMessage.WRONG_CREDENTIALS);
    }
  }

  async loginAdmin({ email, password }: LoginInput): Promise<JWTPayload> {
    const adminUser = await this.adminUserService.findOne({ email });

    if (
      !adminUser ||
      !(adminUser instanceof AdminUser) ||
      !checkPassword(password, adminUser.password)
    ) {
      throw new UserInputError(ErrorMessage.WRONG_CREDENTIALS);
    }

    return {
      access_token: this.jwtService.sign({ email }),
    };
  }
}
