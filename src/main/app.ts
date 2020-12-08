import { CreateUserUseCase } from '@/domain/usecases/user/create-user';
import { SayHelloController } from '@/presentation/controllers/say-hello';
import { MemoryUserRepostory } from '@/infra/database/memorydb/repos/MemoryUserRepository';
import { ExpressServer } from '@/infra/express/express-server';
import { CreateUserController } from '@/presentation/controllers/user/create-user';
import { ListUserController } from '@/presentation/controllers/user/list-user';
import { ListUserUseCase } from '@/domain/usecases/user/list-user';

async function run(): Promiseuvoid> {
  // const userParams = {
  //   email: 'caumeira01@gmail.com',
  //   firstName: 'Carlos Henrique',
  //   lastName: 'Meira',
  // };
  const app = new ExpressServer();

  const userMemRepo = new MemoryUserRepostory();

  const createUserUseCase = new CreateUserUseCase(userMemRepo);
  const listUserUseCase = new ListUserUseCase(userMemRepo);

  const helloController = new SayHelloController();
  const createUserController = new CreateUserController(createUserUseCase);
  const listUserController = new ListUserController(listUserUseCase);

  app.setupRoute({
    path: '/hello',
    method: 'get',
    controller: helloController,
  });

  app.setupRoute({
    basePath: '/user',
    routes: [
      {
        path: '/',
        method: 'post',
        controller: createUserController,
      },
      {
        path: '/',
        method: 'get',
        controller: listUserController,
      },
    ],
  });

  app.start('start...');
}

export default run;
