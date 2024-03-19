import { TeamModelInterface } from '../../Interfaces/team.interface.model';
import SequelizeTeams from './Sequelize.Teams.model';

export default class TeamModel implements TeamModelInterface {
  private model = SequelizeTeams;

  async findAll(): Promise<SequelizeTeams[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams;
  }

  async findByPk(id: number): Promise<SequelizeTeams | null> {
    const dbTeam = await this.model.findByPk(id);
    if (!dbTeam) {
      return null;
    }
    return dbTeam;
  }
}
