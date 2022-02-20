import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'nestjs-seeder';
import { ClassicUser } from '../modules/classic-user/entities/classic-user.entity';
import { UserType } from '../modules/user/enums/user-type.enum';

@Injectable()
export class ClassicUsersSeeder implements Seeder {
  constructor(
    @InjectRepository(ClassicUser)
    private readonly classicUserRepository: EntityRepository<ClassicUser>,
  ) {}

  async seed() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('P@ssword1', salt);

    const user = this.classicUserRepository.create({
      type: UserType.User,
      email: 'email@prettych.at',
      password: hash,
    });
    this.classicUserRepository.persistAndFlush(user);
  }

  async drop() {
    const users = await this.classicUserRepository.find({
      type: UserType.User,
    });

    users.forEach((user) => this.classicUserRepository.remove(user));
    this.classicUserRepository.flush();
  }
}
