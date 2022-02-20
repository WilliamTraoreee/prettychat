import { join } from 'path';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth/auth.module';
import { GqlAuthGuard } from './modules/auth/guards/gql-auth.guard';
import { TemplateModule } from './modules/template/template.module';
import { UserModule } from './modules/user/user.module';
import { env } from './utils/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      sortSchema: true,
      debug: env.NODE_ENV !== 'production',
    }),
    UserModule,
    AuthModule,
    TemplateModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
