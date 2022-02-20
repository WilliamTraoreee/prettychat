import { Injectable } from '@nestjs/common';
import { CreateTemplateInput } from './dto/create-template.input';
import { UpdateTemplateInput } from './dto/update-template.input';

@Injectable()
export class TemplateService {
  create(createTemplateInput: CreateTemplateInput) {
    return 'This action adds a new template';
  }

  findAll() {
    return `This action returns all template`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateInput: UpdateTemplateInput) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
