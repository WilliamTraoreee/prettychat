import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(where: FilterQuery<User>): Promise<User> {
    return this.userRepository.findOneOrFail(where);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.removeAndFlush(user);
    return true;
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      await this.findOne({ email });
      return true;
    } catch {
      return false;
    }
  }
}
