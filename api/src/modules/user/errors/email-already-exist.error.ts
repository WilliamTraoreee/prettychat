import { ApolloError } from 'apollo-server-express';

export class EmailAlreadyExistError extends ApolloError {
  constructor(email: string) {
    super(`Email ${email} already exist`, 'EMAIL_ALREADY_EXIST', {
      email,
    });
  }
}
