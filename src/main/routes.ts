import { SignInUseCase } from '@/application/usecases/auth/sign-in';
import { ListUserUseCase } from '@/application/usecases/user/list-user';
import { UserRepository } from '@/application/repository/user/user-repository';
import { CreateUserUseCase } from '@/application/usecases/user/create-user';

import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { SignInController } from '@/presentation/controllers/auth/sign-in';
import { CreateUserController } from '@/presentation/controllers/user/create-user';
import { ListUserController } from '@/presentation/controllers/user/list-user';
import { Route, RouteGroup } from '@/presentation/protocols/route';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';

export const makeRoutes = (
  userRepository: UserRepository
): (Route | RouteGroup)[] => {
  const bcryptAdapter = new BcryptAdapter(10);
  const jwtAdapter = new JwtAdapter('sc');

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const listUserUseCase = new ListUserUseCase(userRepository);
  const signInUseCase = new SignInUseCase(
    userRepository,
    bcryptAdapter,
    jwtAdapter
  );

  const createUserController = new CreateUserController(createUserUseCase);
  const listUserController = new ListUserController(listUserUseCase);
  const signInController = new SignInController(signInUseCase);

  return [
    {
      path: '/user',
      method: 'get',
      controller: listUserController,
    },
    {
      path: '/user',
      method: 'post',
      controller: createUserController,
    },
    {
      basePath: '/auth',
      routes: [
        {
          path: '/signin',
          method: 'post',
          controller: signInController,
        },
      ],
    },
  ];
};
