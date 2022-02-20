import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClassicUser } from '../classic-user/entities/classic-user.entity';
import authConfig from './auth.config';

export type PasswordResetTokenPayload = {
  email: string;
};
@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(ClassicUser)
    private readonly classicUserRepository: EntityRepository<ClassicUser>,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly _authConfig: ConfigType<typeof authConfig>,
  ) {}

  public signPasswordResetToken(payload: PasswordResetTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this._authConfig.passwordReset.secret,
      expiresIn: this._authConfig.passwordReset.expiresIn,
    });
  }

  public async assignPasswordResetToken(classicUser: ClassicUser) {
    classicUser.passwordResetToken = this.signPasswordResetToken({
      email: classicUser.email,
    });

    await this.classicUserRepository.persistAndFlush(classicUser);
    return classicUser;
  }

  public async isActivePasswordResetToken(token: string) {
    const count = await this.classicUserRepository.count({
      passwordResetToken: token,
    });
    return count > 0;
  }

  public isValidPasswordResetToken(token: string) {
    try {
      const payload = this.jwtService.verify<PasswordResetTokenPayload>(token, {
        secret: this._authConfig.passwordReset.secret,
        ignoreExpiration: false,
      });
      return payload;
    } catch {
      return false;
    }
  }
}
