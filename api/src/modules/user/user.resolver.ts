import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @Query(() => Boolean)
  userEmailExists(@Args('email') email: string): Promise<boolean> {
    return this.userService.emailExists(email);
  }
}
