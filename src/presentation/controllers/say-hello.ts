import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';
import { Controller } from '@/presentation/protocols/controller';

export class SayHelloController implements Controller {
  async handle(_: Request): Promise<Response> {
    return {
      statusCode: 200,
      body: {
        message: 'Hello',
      },
    };
  }
}
