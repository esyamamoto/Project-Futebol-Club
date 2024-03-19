import { MatchesInterface } from '../../Interfaces/macthes.interface';
import { MatchModelInterface } from '../../Interfaces/matches.interface.model';
import SequelizeMatches from './Sequelize.Matches.Model';
import SequelizeTeams from './Sequelize.Teams.model';

export default class MatchModel implements MatchModelInterface {
  private model = SequelizeMatches;

  async allMatches(inProgress?:boolean): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress !== undefined) {
      return matches.filter((match) => match.inProgress === inProgress);
    }
    return matches;
  }

  async matchesFilterProgress(query: string): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: query === 'true',
      },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return matches;
  }

  async finishedMatches(id: string, match: MatchesInterface): Promise<MatchesInterface> {
    const matches = await this.model.findByPk(id);
    if (!matches) {
      throw new Error('Match not found');
    }
    await matches.update({ id: match.id, inProgress: false });
    return matches;
  }

  async updatedMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<MatchesInterface> {
    const matchUpdate = await this.model.findByPk(id);
    if (!matchUpdate) {
      throw new Error('Match not found');
    }
    await matchUpdate.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return matchUpdate;
  }

  async createdMatch(props: MatchesInterface): Promise<MatchesInterface> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = props;
    try {
      const newMatch = await this.model.create({
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return newMatch;
    } catch (error) {
      throw new Error('Error creating match');
    }
  }
}
