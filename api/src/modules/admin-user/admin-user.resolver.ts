import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentAdmin } from '../auth/decorators/current-admin.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { AdminUserService } from './admin-user.service';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserInput } from './inputs/create-admin-user.input';

@Resolver(() => AdminUser)
export class AdminUserResolver {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Public()
  @Mutation(() => AdminUser)
  createAdminUser(
    @Args('createAdminUserInput')
    createAdminUserInput: CreateAdminUserInput,
  ): any {
    return this.adminUserService.create(createAdminUserInput);
  }

  @Mutation(() => Boolean)
  async removeClassicUser(
    @CurrentAdmin() admin: AdminUser,
    @Args('adminUserId') adminUserId: string,
  ) {
    if (!admin) return false;
    await this.adminUserService.removeAdminUser(adminUserId);
    return true;
  }
}
