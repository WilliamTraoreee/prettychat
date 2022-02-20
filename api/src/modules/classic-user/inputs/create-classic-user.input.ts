import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassicUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
