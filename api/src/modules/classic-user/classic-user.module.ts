import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { UserModule } from '../user/user.module';
import { ClassicUserResolver } from './classic-user.resolver';
import { ClassicUserService } from './classic-user.service';
import { ClassicUser } from './entities/classic-user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([ClassicUser]),
    SendgridModule,
    UserModule,
  ],
  providers: [ClassicUserResolver, ClassicUserService],
  exports: [ClassicUserService],
})
export class ClassicUserModule {}
