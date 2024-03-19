import TeamsInterface from '../Interfaces/Teams.interface';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import TeamModel from '../database/models/Teams.Model';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  public async findAllTeams(): Promise<ServiceResponse<TeamsInterface[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  public async findTeamById(id: number): Promise<ServiceResponse<TeamsInterface>> {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
