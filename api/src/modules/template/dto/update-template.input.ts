import { CreateTemplateInput } from './create-template.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTemplateInput extends PartialType(CreateTemplateInput) {
  @Field(() => Int)
  id: number;
}
