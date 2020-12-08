import { UseCase } from '@/domain/usecases/use-case';
import { UserRepository } from '@/data/repository/user/user-repository';
import User from '@/domain/entity/user';

export class ListUserUseCase implements UseCase<never, User[]> {
  constructor(public userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const list = this.userRepository.list();

    return list;
  }
}
