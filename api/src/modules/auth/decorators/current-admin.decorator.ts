import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { UserType } from '../../user/enums/user-type.enum';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as User;
    if (user.type != UserType.Admin) throw new UnauthorizedException();
    return user;
  },
);
