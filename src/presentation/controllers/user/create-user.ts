import { CreateUserUseCase } from '@/domain/usecases/user/create-user';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

export class CreateUserController implements Controller {
  constructor(public createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request): Promise<Response> {
    const result = await this.createUserUseCase.execute(req.body as any);

    return {
      statusCode: 200,
      body: result,
    };
  }
}
