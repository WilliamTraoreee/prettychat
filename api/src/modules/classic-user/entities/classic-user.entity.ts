import { Entity, Property } from '@mikro-orm/core';
import { ObjectType, HideField } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { UserType } from '../../user/enums/user-type.enum';

@Entity({
  discriminatorValue: UserType.User,
})
@ObjectType({
  implements: () => [User],
})
export class ClassicUser extends User {
  @Property({ nullable: true })
  @HideField()
  password?: string;

  @Property({ nullable: true, default: null })
  passwordResetToken?: string;
}
