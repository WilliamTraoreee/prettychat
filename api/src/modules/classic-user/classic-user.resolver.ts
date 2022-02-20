import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { CurrentAdmin } from '../auth/decorators/current-admin.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { ClassicUserService } from './classic-user.service';
import { ClassicUser } from './entities/classic-user.entity';
import { CreateClassicUserInput } from './inputs/create-classic-user.input';

@Resolver(() => ClassicUser)
export class ClassicUserResolver {
  constructor(private readonly classicUserService: ClassicUserService) {}

  @Query(() => ClassicUser)
  async classicUser(@Args('id') id: string): Promise<ClassicUser> {
    return this.classicUserService.findOne({ id });
  }

  @Query(() => [ClassicUser])
  async classicUsers(): Promise<ClassicUser[]> {
    return this.classicUserService.findAll();
  }

  @Public()
  @Mutation(() => ClassicUser)
  createClassicUser(
    @Args('createClassicUserInput')
    createClassicUserInput: CreateClassicUserInput,
  ) {
    return this.classicUserService.create(createClassicUserInput);
  }

  @Mutation(() => Boolean)
  async removeClassicUser(
    @CurrentAdmin() admin: AdminUser,
    @Args('classicUserId') classicUserId: string,
  ) {
    if (!admin) return false;
    await this.classicUserService.removeClassicUser(classicUserId);
    return true;
  }
}
