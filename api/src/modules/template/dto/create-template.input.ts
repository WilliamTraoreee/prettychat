import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTemplateInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
