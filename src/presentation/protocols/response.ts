import { StatusCodes } from 'http-status-codes';

export interface Response {
  statusCode: StatusCodes;
  body?: Record<symbol, unknown>;
}
