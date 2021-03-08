import { MiddlewareError } from './middleware-error';

export class MissingToken extends MiddlewareError {
  constructor() {
    super(401, 'MissingTokenError', 'Token not provided.');
  }
}
