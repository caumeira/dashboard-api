import { MemoryUserRepostory } from '@/infra/database/memorydb/repos/MemoryUserRepository';
import { ExpressServer } from '@/infra/express/express-server';
import { makeRoutes } from '@/main/routes';

export default (): void => {
  const app = new ExpressServer();

  const userMemRepo = new MemoryUserRepostory();

  const routes = makeRoutes(userMemRepo);

  routes.forEach(app.setupRoute);
};
