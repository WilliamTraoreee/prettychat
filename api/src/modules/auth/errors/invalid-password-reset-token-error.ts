import { ApolloError } from 'apollo-server-express';
import { ErrorCode, ErrorMessage } from '../../../utils/errors/ErrorMessage';

export class InvalidPasswordResetToken extends ApolloError {
  constructor() {
    super(
      ErrorMessage.INVALID_PASSWORD_RESET_TOKEN,
      ErrorCode.INVALID_PASSWORD_RESET_TOKEN,
    );
  }
}
