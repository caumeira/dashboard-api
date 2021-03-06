import { Result } from '@/application/logic/Result';
import { UserRepository } from '@/application/repository/user/user-repository';

import { UseCase } from '@/domain/usecases/use-case';
import User from '@/domain/entity/user';

export class ListUserUseCase implements UseCase<never, User[]> {
  constructor(public userRepository: UserRepository) {}

  async execute(): Promise<Result<User[]>> {
    try {
      const list = await this.userRepository.list();

      return Result.ok(list);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
