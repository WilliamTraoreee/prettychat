import { Controller } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { AdminUserService } from '../admin-user/admin-user.service';
import { ClassicUserService } from '../classic-user/classic-user.service';
import { ClassicUser } from '../classic-user/entities/classic-user.entity';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginInput } from './inputs/login.input';

@Controller()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly classicUserService: ClassicUserService,
    private readonly adminUserService: AdminUserService,
  ) {}

  @Public()
  @Mutation(() => String)
  public async login(@Args('input') input: LoginInput) {
    const { access_token } = await this.authService.login(input);
    return access_token;
  }

  @Public()
  @Mutation(() => String)
  public async loginAdmin(@Args('input') input: LoginInput) {
    const { access_token } = await this.authService.loginAdmin(input);
    return access_token;
  }

  @Query(() => User)
  public me(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => ClassicUser)
  public meAsClassicUser(@CurrentUser() user: User) {
    return this.classicUserService.findOne({ id: user.id });
  }

  @Query(() => User)
  public meAsAdmin(@CurrentUser() user: User) {
    return this.adminUserService.findOne({ id: user.id });
  }
}
