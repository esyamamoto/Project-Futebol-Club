import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatchModel from '../database/models/Macthes.Model';
import { MatchModelInterface } from '../Interfaces/matches.interface.model';
import { MatchesInterface } from '../Interfaces/macthes.interface';
import TeamService from './teams.service';

export default class MatchService {
  constructor(
    private model: MatchModelInterface = new MatchModel(),
    private service = new TeamService(),
  ) {}

  public async allMatches(inProgress?: boolean): Promise<ServiceResponse<MatchesInterface[]>> {
    const macthes = await this.model.allMatches(inProgress);
    return {
      status: 'SUCCESSFUL',
      data: macthes,
    };
  }

  public async finishedMatches(id: string, match: MatchesInterface) {
    await this.model.finishedMatches(id, match);
    return {
      status: 'SUCCESSFUL',
      message: 'Finished',
    };
  }

  public async updatedMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ) {
    await this.model.updatedMatches(
      homeTeamGoals,
      awayTeamGoals,
      id,
    );
    return {
      status: 'SUCCESSFUL',
      data: 'Match updated',
    };
  }

  public async createdMatch(props: MatchesInterface): Promise<ServiceResponse<MatchesInterface>> {
    const { homeTeamId, awayTeamId } = props;
    const team01 = await this.service.findTeamById(Number(homeTeamId));
    const team02 = await this.service.findTeamById(Number(awayTeamId));

    if (team01.status === 'NOT_FOUND' || team02.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.model.createdMatch(props);
    return { status: 'CREATED', data: newMatch };
  }
}
