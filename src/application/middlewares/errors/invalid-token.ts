import { MiddlewareError } from './middleware-error';

export class InvalidToken extends MiddlewareError {
  constructor() {
    super(401, 'InvalidTokenError', 'Provide a valid token!');
  }
}
