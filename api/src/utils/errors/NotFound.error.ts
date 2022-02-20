import { ApolloError } from 'apollo-server-express';
import { ErrorCode } from './ErrorMessage';

export class NotFoundError extends ApolloError {
  constructor(private readonly entity: any) {
    super(`${entity} not found`, ErrorCode.NOT_FOUND);
  }
}
