import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { UserModule } from '../user/user.module';
import { AdminUserResolver } from './admin-user.resolver';
import { AdminUserService } from './admin-user.service';
import { AdminUser } from './entities/admin-user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AdminUser]), SendgridModule, UserModule],
  providers: [AdminUserResolver, AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
