import User from '../../../domain/entity/user';
import { Repository } from '../repository';

export interface UserRepository extends Repository {
  save: (user: User) => Promise<User>;
  list: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | undefined>;
}
