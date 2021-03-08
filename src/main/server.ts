import { PrismaClient } from '@prisma/client';

import { PrismaUserRepository } from '@/infra/database/prisma/repos/prisma-user-repository';
import { ExpressServer } from '@/infra/express/express-server';
import { makeRoutes } from '@/main/routes';
import { PrismaVideoRepository } from '@/infra/database/prisma/repos/prisma-video-repository';

export default (): void => {
  const app = new ExpressServer();
  const prisma = new PrismaClient();

  const userMemRepo = new PrismaUserRepository(prisma);
  const videoPrismaRepo = new PrismaVideoRepository(prisma);

  const routes = makeRoutes(userMemRepo, videoPrismaRepo);

  routes.forEach(app.setupRoute);

  app.start({ hostname: 'localhost', port: 3333 });
};
