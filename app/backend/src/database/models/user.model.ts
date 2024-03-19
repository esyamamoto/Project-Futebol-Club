import { LoginInterface } from '../../Interfaces/login.interface';
import { Users } from '../../Interfaces/user.interface';
import UsersModelSeq from './Sequelize.User.Model';

export default class UserModel implements LoginInterface {
  private model = UsersModelSeq;
  async allUsers(): Promise<Users[]> {
    const users = await this.model.findAll();
    return users;
  }

  async findOne(email: string): Promise<Users | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
