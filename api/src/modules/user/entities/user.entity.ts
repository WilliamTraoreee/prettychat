import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../../../utils/PrimaryKeyUuid.decorator';
import { UserType } from '../enums/user-type.enum';

@Entity({
  discriminatorColumn: 'type',
  abstract: true,
})
@InterfaceType({
  resolveType(user) {
    switch (user.type) {
      case UserType.User:
        return 'User';
      case UserType.Admin:
        return 'Admin';
    }
    return 'ClassicUser';
  },
})
export class User {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id: string;

  @Enum(() => UserType)
  type: UserType;

  @Property()
  @Unique()
  email: string;

  @Property({ onCreate: () => new Date() })
  @Field(() => Date)
  createdAt = new Date();
}
