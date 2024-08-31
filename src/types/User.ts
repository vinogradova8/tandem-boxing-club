import { RoleName } from './RoleName';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleName;
  login: string;
  password: string;
};
