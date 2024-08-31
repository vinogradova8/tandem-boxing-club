import { RoleName } from './RoleName';

export type Auth = {
  login: string;
  password: string;
  role: RoleName;
  accessToken: string;
};
