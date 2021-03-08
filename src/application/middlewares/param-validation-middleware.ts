import { Result } from '../logic/Result';

import { Controller } from '@/presentation/protocols/controller';
import { Middleware } from '@/presentation/protocols/middleware';
import { Request } from '@/presentation/protocols/request';

export class ParamValidationMiddleware implements Middleware {
  handle = async (
    request: Request<Record<string, never>>,
    controller: Controller<{}>
  ): Promise<Result<Error>> => {
    if() {
      
    }

    return Result.fail(new Error(''));
  };
}
