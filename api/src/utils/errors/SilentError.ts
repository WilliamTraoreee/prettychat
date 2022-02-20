import { ApolloError } from 'apollo-server-express';

/**
 * Silent errors won't display a toast client-side
 */
export class SilentError extends ApolloError {
  readonly silent = true;

  constructor(message: string) {
    super(message);
  }
}
