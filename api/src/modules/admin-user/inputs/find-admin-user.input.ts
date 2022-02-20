import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindAdminUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { defaultValue: 0 })
  offset!: number;
}
