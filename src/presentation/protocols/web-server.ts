import { Route, RouteGroup } from '@/presentation/protocols/route';

export type WebServerConfig = {
  hostname: string;
  port: number;
};

export interface WebServer {
  setupRoute: (route: Route | RouteGroup) => void;
  start: (config: WebServerConfig) => void;
}
