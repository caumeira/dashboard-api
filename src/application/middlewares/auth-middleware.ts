import { InvalidToken } from './errors/invalid-token';
import { MissingToken } from './errors/missing-token';

import { Result } from '../logic/Result';

import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { Middleware } from '@/presentation/protocols/middleware';
import { Request } from '@/presentation/protocols/request';

type AuthMiddlewareResponse = Record<symbol | string, unknown>;

export class AuthMiddleware implements Middleware {
  constructor(public jwtAdapter: JwtAdapter) {}

  async handle(
    request: Request
  ): Promise<Result<Error | AuthMiddlewareResponse>> {
    if (!request?.body || !('acessToken' in request.body)) {
      return Result.fail(new MissingToken());
    }

    try {
      const { acessToken } = request.body;

      const jwtPayload = await this.jwtAdapter.decrypt(acessToken);

      return Result.ok(jwtPayload as AuthMiddlewareResponse);
    } catch (error) {
      return Result.fail(new InvalidToken());
    }
  }
}
