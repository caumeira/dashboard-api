/* eslint-disable @typescript-eslint/ban-types */
import { SchemaOf } from 'yup';

import { Request } from './request';
import { Response } from './response';

export interface Controller<
  Params extends Record<string, unknown> = never,
  T = {}
> {
  paramSchema?(): SchemaOf<Params>;
  handle(req: Request<Params, T>): Promise<Response>;
}
