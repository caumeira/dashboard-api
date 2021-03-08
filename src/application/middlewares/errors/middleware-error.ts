export class MiddlewareError extends Error {
  constructor(
    public statusCode: number,
    public name: string,
    public description: string
  ) {
    super(description);
  }
}
