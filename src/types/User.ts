import { RoleName } from './RoleName';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleName;
  email: string;
  password: string;
};
