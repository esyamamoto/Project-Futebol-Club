import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginInterface } from '../Interfaces/login.interface';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../Interfaces/serviceResponse';

type t = { token: string };

export default class UserService {
  constructor(private newLogin: LoginInterface = new UserModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<t>> {
    const user = await this.newLogin.findOne(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7h' },
    );
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
