import { UseCase } from '@/domain/usecases/use-case';
import { UserRepository } from '@/data/repository/user/user-repository';
import User from '@/domain/entity/user';
import { Result } from '@/data/logic/Result';

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
