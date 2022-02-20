import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
