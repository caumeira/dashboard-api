import { PrismaClient } from '@prisma/client';

import { PrismaUserRepository } from '@/infra/database/prisma/repos/prisma-user-repository';
import { ExpressServer } from '@/infra/express/express-server';
import { makeRoutes } from '@/main/routes';

export default (): void => {
  const app = new ExpressServer();
  const prisma = new PrismaClient();

  const userMemRepo = new PrismaUserRepository(prisma);

  const routes = makeRoutes(userMemRepo);

  routes.forEach(app.setupRoute);

  app.start({ hostname: 'localhost', port: 3333 });
};
