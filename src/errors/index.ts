import { ApolloError } from 'apollo-server';
export {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';

export { default as ERROR_CODES } from './constants';

export class BadRequestError extends ApolloError {
  constructor(errorCode, args?: any) {
    const { code, message } = errorCode;
    super(message, 'BAD_REQUEST', args);
    this.extensions.code = code;
  }
}

export class DatasouceError extends ApolloError {
  constructor(errorCode, args?: any) {
    const { code, message } = errorCode;
    super(message, 'DATASOURCE_ERROR', args);
    this.extensions.code = code;
  }
}
