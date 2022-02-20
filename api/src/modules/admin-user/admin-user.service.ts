import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { NotFoundError } from '../../utils/errors/NotFound.error';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserType } from '../user/enums/user-type.enum';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserInput } from './inputs/create-admin-user.input';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
    private readonly sendGridService: SendgridService,
  ) {}

  async findOne(where: Partial<AdminUser>): Promise<AdminUser> {
    const user = await this.adminUserRepository.findOne(where);
    if (user?.type == UserType.Admin) return user;
    throw new NotFoundError('Admin user');
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      await this.adminUserRepository.findOne({ email });
      return true;
    } catch {
      return false;
    }
  }

  async create(createAdminUserInput: CreateAdminUserInput): Promise<AdminUser> {
    const userAlreadyExists = await this.adminUserRepository.findOne({
      email: createAdminUserInput.email,
    });
    if (userAlreadyExists) {
      throw new HttpException(
        ErrorMessage.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createAdminUserInput.password, salt);

    const adminUser = this.adminUserRepository.create({
      ...createAdminUserInput,
      password: hash,
    });

    await this.adminUserRepository.persistAndFlush(adminUser);

    this.sendGridService.sendCreateClassicUserAccountConfirmEmail({
      email: adminUser.email,
    });

    return adminUser;
  }

  async removeAdminUser(userId: string) {
    const user = await this.findOne({ id: userId });
    this.adminUserRepository.removeAndFlush(user);
  }
}
