import { RoleDTO } from './role-dto';

export type UserDTO = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleDTO;
};
