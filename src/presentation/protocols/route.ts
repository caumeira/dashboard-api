import { Middleware } from './middleware';

import { Controller } from '@/presentation/protocols/controller';

export type Method = 'get' | 'post' | 'put' | 'delete';

export type Route = {
  path: string;
  method: Method;
  middleware?: Middleware[];
  controller: Controller<any, any>;
};

export type RouteGroup = {
  basePath: string;
  routes: Route[];
};
