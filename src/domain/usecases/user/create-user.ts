import { UserRepository } from '@/data/repository/user/user-repository';
import { UseCase } from '@/domain/usecases/use-case';
import User from '@/domain/entity/user';
import { Result } from '@/data/logic/Result';

export type CreateUserParam = Omit<User, 'id'>;

export class CreateUserUseCase implements UseCase<CreateUserParam, User> {
  constructor(public userRepository: UserRepository) {}

  async execute(params: CreateUserParam): Promise<Result<User>> {
    try {
      const user = new User(params.firstName, params.lastName, params.email);

      await this.userRepository.save(user);

      return Result.ok(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
