import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from '../../utils/env';
import { AdminUserModule } from '../admin-user/admin-user.module';
import { ClassicUserModule } from '../classic-user/classic-user.module';
import { ClassicUser } from '../classic-user/entities/classic-user.entity';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { UserModule } from '../user/user.module';
import authConfig from './auth.config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { PasswordResetResolver } from './password-reset.resolver';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [
    UserModule,
    AdminUserModule,
    ClassicUserModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature({
      entities: [ClassicUser],
    }),
    SendgridModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordResetService,
    PasswordResetResolver,
  ],
})
export class AuthModule {}
