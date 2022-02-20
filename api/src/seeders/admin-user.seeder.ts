import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'nestjs-seeder';
import { AdminUser } from '../modules/admin-user/entities/admin-user.entity';
import { UserType } from '../modules/user/enums/user-type.enum';

@Injectable()
export class AdminUsersSeeder implements Seeder {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
  ) {}

  async seed() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('P@ssword1', salt);

    const user = this.adminUserRepository.create({
      type: UserType.Admin,
      email: 'emailadmin@prettych.at',
      password: hash,
    });
    this.adminUserRepository.persistAndFlush(user);
  }

  async drop() {
    const users = await this.adminUserRepository.find({
      type: UserType.User,
    });

    users.forEach((user) => this.adminUserRepository.remove(user));
    this.adminUserRepository.flush();
  }
}
