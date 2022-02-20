import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { hashPassword } from '../../utils/hash-password';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { ClassicUser } from './entities/classic-user.entity';
import { CreateClassicUserInput } from './inputs/create-classic-user.input';

@Injectable()
export class ClassicUserService {
  constructor(
    @InjectRepository(ClassicUser)
    private readonly classicUserRepository: EntityRepository<ClassicUser>,
    private readonly sendGridService: SendgridService,
  ) {}

  findOne(where: FilterQuery<ClassicUser>): Promise<ClassicUser> {
    return this.classicUserRepository.findOneOrFail(where);
  }

  async findAll(): Promise<ClassicUser[]> {
    return this.classicUserRepository.findAll();
  }

  async create(
    createClassicUserInput: CreateClassicUserInput,
  ): Promise<ClassicUser> {
    const userAlreadyExists = await this.classicUserRepository.findOne({
      email: createClassicUserInput.email,
    });
    if (userAlreadyExists) {
      throw new HttpException(
        ErrorMessage.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createClassicUserInput.password, salt);

    const classicUser = this.classicUserRepository.create({
      ...createClassicUserInput,
      password: hash,
    });

    await this.classicUserRepository.persistAndFlush(classicUser);

    this.sendGridService.sendCreateClassicUserAccountConfirmEmail({
      email: classicUser.email,
    });

    return classicUser;
  }

  async updatePassword(classicUser: ClassicUser, newPassword: string) {
    classicUser.password = hashPassword(newPassword);
    await this.classicUserRepository.persistAndFlush(classicUser);

    return classicUser;
  }

  async removeClassicUser(userId: string) {
    const user = await this.findOne({ id: userId });
    this.classicUserRepository.removeAndFlush(user);
  }
}
