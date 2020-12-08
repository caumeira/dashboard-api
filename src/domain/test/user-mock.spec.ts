import faker from 'faker';

import User from '../entity/user';

export const mockUser = (): User =>
  new User(
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email()
  );
