import { Request } from './request';
import { Response } from './response';

export interface Controller {
  handle(req: Request): Promise<Response>;
}
