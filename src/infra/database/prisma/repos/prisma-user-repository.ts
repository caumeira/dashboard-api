import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/application/repository/user/user-repository';
import { UserDTO } from '@/application/dtos/user-dto';

export class PrismaUserRepository implements UserRepository {
  constructor(public prisma: PrismaClient) {}

  save = async (user: UserDTO): Promise<UserDTO> => {
    const insertRes = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: user.role.id,
      },
      include: {
        role: true,
      },
    });

    insertRes.role = {
      id: 1,
      name: '',
    };

    return insertRes;
  };

  findByEmail = async (email: string): Promise<UserDTO | undefined> => {
    const res = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: { role: true },
    });

    if (!res) return undefined;

    return res;
  };
}
