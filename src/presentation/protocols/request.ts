type UnknownObject = Record<symbol, unknown>;

export type Request<
  Params = Record<string, never>,
  T = Record<string, unknown>
> = {
  params?: UnknownObject;
  headers?: UnknownObject;
  body: Params & UnknownObject;
} & T;
