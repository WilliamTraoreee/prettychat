import { registerEnumType } from '@nestjs/graphql';

export enum TemplateType {
  chat = 'chat',
  subAlert = 'subAlert',
  subGiftAlert = 'subGiftAlert',
}

registerEnumType(TemplateType, {
  name: 'TemplateType',
});
