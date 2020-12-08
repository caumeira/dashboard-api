import { v4 as uuid } from 'uuid';

export default class User {
  public id: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string
  ) {
    this.id = uuid();
  }
}
