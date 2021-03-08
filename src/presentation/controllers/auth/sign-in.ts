import * as yup from 'yup';

import { SignInUseCase } from '@/application/usecases/auth/sign-in';
import { badRequest, created } from '@/presentation/helpers/http/http-helper';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

type SignInParams = {
  email: string;
  password: string;
};

const signInParamScheme = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export class SignInController implements Controller<SignInParams> {
  constructor(public signInUseCase: SignInUseCase) {}

  paramSchema(): yup.SchemaOf<SignInParams> {
    return signInParamScheme;
  }

  async handle(req: Request<SignInParams>): Promise<Response> {
    const { email, password } = req.body;

    const result = await this.signInUseCase.execute({
      email,
      password,
    });

    if (!result.isSuccess) {
      return badRequest(result.error);
    }

    return created(result.getValue());
  }
}
