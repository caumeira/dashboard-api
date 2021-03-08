import { UserRepository } from '@/application/repository/user/user-repository';
import { VideoRepository } from '@/application/repository/video/video-repository';
import { CreateUserUseCase } from '@/application/usecases/user/create-user';
import { ListUserUseCase } from '@/application/usecases/user/list-user';
import { AddVideoUseCase } from '@/application/usecases/video/add-video';
import { SignInUseCase } from '@/application/usecases/auth/sign-in';

import { Route, RouteGroup } from '@/presentation/protocols/route';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AuthMiddleware } from '@/application/middlewares/auth-middleware';
import { SignInController } from '@/presentation/controllers/auth/sign-in';
import { CreateUserController } from '@/presentation/controllers/user/create-user';
import { ListUserController } from '@/presentation/controllers/user/list-user';
import { SignOutController } from '@/presentation/controllers/auth/sign-out';
import { AddVideoController } from '@/presentation/controllers/video/add-video';

export const makeRoutes = (
  userRepository: UserRepository,
  videoRepository: VideoRepository
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
  const addVideoUseCase = new AddVideoUseCase(videoRepository);

  const authMiddleware = new AuthMiddleware(jwtAdapter);

  const createUserController = new CreateUserController(createUserUseCase);
  const listUserController = new ListUserController(listUserUseCase);
  const signInController = new SignInController(signInUseCase);
  const signOutController = new SignOutController();
  const addVideoController = new AddVideoController(addVideoUseCase);

  const getUserRoute: Route = {
    path: '/user',
    method: 'get',
    middleware: [],
    controller: listUserController,
  };

  return [
    getUserRoute,
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
        {
          path: '/signout',
          method: 'post',
          middleware: [authMiddleware],
          controller: signOutController,
        },
      ],
    },
    {
      path: '/video',
      method: 'post',
      middleware: [authMiddleware],
      controller: addVideoController,
    },
  ];
};
