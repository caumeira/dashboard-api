import { UseCase } from '@/application/usecases/use-case';
import { UserRepository } from '@/application/repository/user/user-repository';
import { Result } from '@/application/logic/Result';
import { User } from '@/domain/entity/user';

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
