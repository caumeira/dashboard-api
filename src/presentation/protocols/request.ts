type UnknownObject = Record<symbol, unknown>;

export interface Request {
  params?: UnknownObject;
  headers?: UnknownObject;
  body?: UnknownObject;
}
