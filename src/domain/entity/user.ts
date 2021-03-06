// import { v4 as uuid } from 'uuid';

import { Role } from '@/domain/entity/role';

export class User {
  // public id: string;

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: Role
  ) {
    // this.id = uuid();
  }
}
