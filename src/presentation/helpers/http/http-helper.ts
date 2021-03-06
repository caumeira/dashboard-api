/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StatusCodes } from 'http-status-codes';

import { Response } from '@/presentation/protocols/response';

export const ok = (body: any): Response => ({
  statusCode: StatusCodes.OK,
  body,
});
export const created = (body: any): Response => ({
  statusCode: StatusCodes.CREATED,
  body,
});

export const badRequest = (error?: any): Response => ({
  statusCode: StatusCodes.BAD_REQUEST,
  body: {
    error: error
      ? {
          name: error.name,
          description: error.message,
        }
      : {
          name: 'Undefinied Error',
          description: '...',
        },
  },
});
