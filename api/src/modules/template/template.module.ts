import { Module } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';

@Module({
  providers: [TemplateResolver, TemplateService],
})
export class TemplateModule {}
