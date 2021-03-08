import { Controller } from './controller';

import { Result } from '@/application/logic/Result';
import { Request } from '@/presentation/protocols/request';

export interface Middleware {
  handle: (
    request: Request,
    controller: Controller
  ) => Promise<Result<Error | Record<symbol | string, unknown>>>;
}
