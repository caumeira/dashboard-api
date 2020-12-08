import { ListUserUseCase } from '@/domain/usecases/user/list-user';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

export class ListUserController implements Controller {
  constructor(public listUserUseCase: ListUserUseCase) {}

  async handle(_: Request): Promise<Response> {
    const users = await this.listUserUseCase.execute();

    return {
      statusCode: 200,
      body: users,
    };
  }
}