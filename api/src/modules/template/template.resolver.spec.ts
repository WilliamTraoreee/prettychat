import { Test, TestingModule } from '@nestjs/testing';
import { TemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';

describe('TemplateResolver', () => {
  let resolver: TemplateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateResolver, TemplateService],
    }).compile();

    resolver = module.get<TemplateResolver>(TemplateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
