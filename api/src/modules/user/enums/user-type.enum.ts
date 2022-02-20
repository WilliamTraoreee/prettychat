import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  User = 'user',
  Admin = 'admin',
}

registerEnumType(UserType, {
  name: 'UserType',
});
