import { Entity, Property } from '@mikro-orm/core';
import { HideField, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { UserType } from '../../user/enums/user-type.enum';

@Entity({
  discriminatorValue: UserType.Admin,
})
@ObjectType({
  implements: () => [User],
})
export class AdminUser extends User {
  @Property({ nullable: true })
  @HideField()
  password?: string;

  @Property({ nullable: true, default: null })
  passwordResetToken?: string;
}
