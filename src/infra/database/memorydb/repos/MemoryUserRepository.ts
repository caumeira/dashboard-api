import { UserRepository } from '@/data/repository/user/user-repository';
import User from '@/domain/entity/user';

export class MemoryUserRepostory implements UserRepository {
  users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
