import { ok } from '@/presentation/helpers/http/http-helper';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

export class SignOutController implements Controller {
  async handle(req: Request): Promise<Response> {
    return ok({ message: 'deslogou', userId: req.id });
  }
}
