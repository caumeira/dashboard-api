import * as yup from 'yup';

import { SignInUseCase } from '@/application/usecases/auth/sign-in';
import { badRequest, created } from '@/presentation/helpers/http/http-helper';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

const signInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export class SignInController implements Controller {
  constructor(public signInUseCase: SignInUseCase) {}

  async handle(req: Request): Promise<Response> {
    try {
      const { email, password } = signInSchema.validateSync(req.body, {
        abortEarly: false,
      });

      const result = await this.signInUseCase.execute({
        email,
        password,
      });

      if (!result.isSuccess) {
        return badRequest(result.error);
      }

      return created(result.getValue());
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const fields = error.inner.map((item) => ({
          field: item.path,
          error: item.errors,
        }));

        return {
          statusCode: 400,
          body: {
            error: {
              name: error.name,
              description: error.message,
              fields,
            },
          },
        };
      }

      console.log(error);

      return badRequest();
    }
  }
}
