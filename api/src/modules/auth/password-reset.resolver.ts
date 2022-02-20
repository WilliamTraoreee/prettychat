import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClassicUserService } from '../classic-user/classic-user.service';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { Public } from './decorators/public.decorator';
import { InvalidPasswordResetToken } from './errors/invalid-password-reset-token-error';
import {
  PasswordResetClassicUserInput,
  ClassicUserPasswordResetRequestInput,
} from './inputs/password-reset.input';
import { PasswordResetService } from './password-reset.service';

@Resolver()
export class PasswordResetResolver {
  constructor(
    private readonly classicUserService: ClassicUserService,
    private readonly passwordResetService: PasswordResetService,
    private readonly sendGridService: SendgridService,
  ) {}

  @Public()
  @Mutation(() => Boolean)
  async requestPasswordResetClassicUser(
    @Args('input') input: ClassicUserPasswordResetRequestInput,
  ) {
    const classicUser = await this.classicUserService.findOne({
      email: input.email,
    });
    if (!classicUser) return true;

    const classicUserWithToken =
      await this.passwordResetService.assignPasswordResetToken(classicUser);
    if (!classicUserWithToken) return true;

    this.sendGridService.sendPasswordResetRequestEmail({
      email: classicUser.email,
      token: classicUserWithToken.passwordResetToken,
    });

    return true;
  }

  @Public()
  @Mutation(() => Boolean)
  public async passwordResetClassicUser(
    @Args('input') input: PasswordResetClassicUserInput,
  ) {
    const isActivePasswordResetToken =
      await this.passwordResetService.isActivePasswordResetToken(
        input.passwordResetToken,
      );

    if (!isActivePasswordResetToken) {
      throw new InvalidPasswordResetToken();
    }

    const isValidPasswordResetToken =
      this.passwordResetService.isValidPasswordResetToken(
        input.passwordResetToken,
      );

    if (!isValidPasswordResetToken) {
      throw new InvalidPasswordResetToken();
    }

    const { email } = isValidPasswordResetToken;

    const classicUser = await this.classicUserService.findOne({ email });
    if (!classicUser) {
      throw new InternalServerErrorException();
    }

    await this.classicUserService.updatePassword(
      classicUser,
      input.newPassword,
    );

    return true;
  }
}
