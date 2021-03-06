import { Repository } from '@/application/repository/repository';
import { UserDTO } from '@/application/dtos/user-dto';

export interface UserRepository extends Repository {
  save: (user: UserDTO) => Promise<UserDTO>;
  findByEmail: (email: string) => Promise<UserDTO | undefined>;
}
