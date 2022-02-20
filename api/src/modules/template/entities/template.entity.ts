import { Entity, Enum, Property } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../../../utils/PrimaryKeyUuid.decorator';
import { TemplateType } from '../enums/template-type.enum';

@Entity()
@ObjectType()
export class Template {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id: string;

  @Field(() => String)
  name: number;

  @Enum({ default: TemplateType.chat, items: () => TemplateType })
  @Field(() => TemplateType)
  type!: TemplateType;

  @Property({ onCreate: () => new Date() })
  @Field(() => Date)
  createdAt = new Date();
}
