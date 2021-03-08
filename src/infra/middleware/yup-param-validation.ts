import { Middleware } from '@/presentation/protocols/middleware';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

export class YupParamValidation implements Middleware {
  handle = (
    request: Request,
    response: Response,
    nextFunction: () => void
  ): void => {
    nextFunction();
  };
}
