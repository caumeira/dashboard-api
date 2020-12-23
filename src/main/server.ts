import { ExpressServer } from '@/infra/express/express-server';
import { MemoryUserRepostory } from '@/infra/database/memorydb/repos/MemoryUserRepository';
import { CreateUserController } from '@/presentation/controllers/user/create-user';
import { ListUserController } from '@/presentation/controllers/user/list-user';
import { CreateUserUseCase } from '@/domain/usecases/user/create-user';
import { ListUserUseCase } from '@/domain/usecases/user/list-user';

export default (): void => {
  const app = new ExpressServer();

  const userMemRepo = new MemoryUserRepostory();

  const createUserUseCase = new CreateUserUseCase(userMemRepo);
  const listUserUseCase = new ListUserUseCase(userMemRepo);

  const createUserController = new CreateUserController(createUserUseCase);
  const listUserController = new ListUserController(listUserUseCase);

  app.setupRoute({
    path: '/user',
    method: 'get',
    controller: listUserController,
  });

  app.setupRoute({
    path: '/user',
    method: 'post',
    controller: createUserController,
  });

  app.start({
    hostname: '0.0.0.0',
    port: 3000,
  });
};
