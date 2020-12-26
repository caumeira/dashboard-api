import { UserRepository } from '@/application/repository/user/user-repository';
import { CreateUserUseCase } from '@/domain/usecases/user/create-user';
import { ListUserUseCase } from '@/domain/usecases/user/list-user';
import { CreateUserController } from '@/presentation/controllers/user/create-user';
import { ListUserController } from '@/presentation/controllers/user/list-user';
import { Route } from '@/presentation/protocols/route';

export const makeRoutes = (userRepository: UserRepository): Route[] => {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const listUserUseCase = new ListUserUseCase(userRepository);

  const createUserController = new CreateUserController(createUserUseCase);
  const listUserController = new ListUserController(listUserUseCase);

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
  ];
};
