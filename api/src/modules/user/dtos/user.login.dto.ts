import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginDTO {
  @Field()
  username!: string;

  @Field()
  plainPassword!: string;
}
