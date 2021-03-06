import { UseCase } from '../use-case';

import { EmailNotFound, WrongPassword } from './errors';

import { Result } from '@/application/logic/Result';
import { UserRepository } from '@/application/repository/user/user-repository';
import { HashComparer } from '@/application/criptography/hash-comparer';
import { Hasher } from '@/application/criptography/hasher';
import { Encrypter } from '@/application/criptography/encrypter';
import { Decrypter } from '@/application/criptography/decrypter';

type SignInParams = {
  email: string;
  password: string;
};

type SignInResult = {
  accessToken: string;
};

export class SignInUseCase
  implements
    UseCase<SignInParams, SignInResult | EmailNotFound | WrongPassword> {
  constructor(
    public userRepo: UserRepository,
    public hasher: Hasher & HashComparer,
    public jwtSign: Encrypter & Decrypter
  ) {}

  async execute({
    email,
    password,
  }: SignInParams): Promise<
    Result<SignInResult | EmailNotFound | WrongPassword>
  > {
    const userResult = await this.userRepo.findByEmail(email);

    if (!userResult) {
      return Result.fail(new EmailNotFound());
    }

    const samePassword = await this.hasher.compare(
      password,
      userResult.password
    );

    if (!samePassword) {
      return Result.fail(new WrongPassword());
    }

    const accessToken = await this.jwtSign.encrypt(userResult.id.toString());

    return Result.ok({
      accessToken,
    });
  }
}
