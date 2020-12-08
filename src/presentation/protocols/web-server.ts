import { Route, RouteGroup } from '@/presentation/protocols/route';

export interface WebServer {
  setupRoute: (route: Route | RouteGroup) => void;
  start: (config: string) => void;
}
