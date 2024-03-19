import { Users } from './user.interface';

export interface LoginInterface {
  findOne: (email: string) => Promise<Users | null>;
}
