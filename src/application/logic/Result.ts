export class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  private value: T;

  public error: T | string | undefined;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    this.error = error as T;
    this.value = value as T;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);

      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this.value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: U): Result<U> {
    return new Result<U>(false, error);
  }
}
