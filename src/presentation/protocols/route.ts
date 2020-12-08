import { Controller } from '@/presentation/protocols/controller';

export type Method = 'get' | 'post' | 'put' | 'delete';

export type Route = {
  path: string;
  method: Method;
  controller: Controller;
};

export type RouteGroup = {
  basePath: string;
  routes: Route[];
};
