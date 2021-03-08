import express, { Express, Router } from 'express';

import { ValidationError } from 'yup';

import { Route, RouteGroup } from '@/presentation/protocols/route';
import {
  WebServer,
  WebServerConfig,
} from '@/presentation/protocols/web-server';
import { badRequest } from '@/presentation/helpers/http/http-helper';
import { MiddlewareError } from '@/application/middlewares/errors/middleware-error';

export class ExpressServer implements WebServer {
  constructor(public expressApp: Express = express()) {
    this.expressApp.use(express.json());
  }

  setupRoute = (route: Route | RouteGroup): void => {
    const routesPrefix = 'basePath' in route ? route.basePath : '';
    const routes = 'path' in route ? [route] : route.routes;

    const router = Router();

    routes.forEach((item) => {
      router.use(item.path, async (req, res, next) => {
        try {
          if (item.controller.paramSchema) {
            item.controller.paramSchema().validateSync(req.body, {
              abortEarly: false,
            });
          }

          next();
        } catch (error) {
          if (error instanceof ValidationError) {
            const fields = error.inner.map((errorItem) => ({
              field: errorItem.path,
              error: errorItem.errors,
            }));

            res.status(400).json({
              error: {
                name: error.name,
                description: error.message,
                fields,
              },
            });
          }
        }
      });

      item.middleware?.forEach((middleware) => {
        router.use(item.path, async (req, res, next) => {
          const middlewareValue = await middleware.handle(req, item.controller);

          if (middlewareValue.isSuccess) {
            Object.assign(req, middlewareValue.getValue());
            next();

            return;
          }

          const middlewareError = middlewareValue.errorValue();

          if (middlewareError instanceof Error) {
            const response = badRequest(middlewareError);

            if (middlewareError instanceof MiddlewareError) {
              response.statusCode = middlewareError.statusCode;
            }

            res.status(response.statusCode).json(response.body);

            return;
          }

          res.status(400).json({});
        });
      });

      router[item.method](item.path, async (req, res) => {
        const result = await item.controller.handle(req);

        res.status(result.statusCode).json(result.body);
      });
    });

    this.expressApp.use(routesPrefix, router);
  };

  start(config: WebServerConfig): void {
    this.expressApp.listen(config.port, config.hostname);
  }
}
