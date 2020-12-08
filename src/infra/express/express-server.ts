import express, { Express, Router } from 'express';

import { WebServer } from '@/presentation/protocols/web-server';
import { Route, RouteGroup } from '@/presentation/protocols/route';

export class ExpressServer implements WebServer {
  constructor(public expressApp: Express = express()) {
    this.expressApp.use(express.json());
  }

  setupRoute(route: Route | RouteGroup): void {
    const routesPrefix = 'path' in route ? route.path : route.basePath;
    const routes = 'path' in route ? [route] : route.routes;

    const router = Router();

    routes.forEach((item) => {
      router[item.method](item.path, async (req, res) => {
        const result = await item.controller.handle(req);

        res.status(result.statusCode).json(result.body);
      });
    });

    this.expressApp.use(routesPrefix, router);
  }

  start(_: string): void {
    this.expressApp.listen(3000);
  }
}