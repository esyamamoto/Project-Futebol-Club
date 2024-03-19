import MatchModel from '../database/models/Macthes.Model';
import TeamModel from '../database/models/Teams.Model';
import {
  totalGamesHome,
  totalVictoryHome,
  totalLossesHome,
  totalDrawsHome,
  totalPointsHome,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  scoreEffective,
  positionTeams,
} from '../database/models/scoreboard.model';

export default class scoreBoardService {
  constructor(
    private model = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async allScoreBoard() {
    const teams = await this.teamModel.findAll();
    const matches = await this.model.matchesFilterProgress('false');
    const teamsScore = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsHome(team.id, matches),
      totalGames: totalGamesHome(team.id, matches),
      totalVictories: totalVictoryHome(team.id, matches),
      totalDraws: totalDrawsHome(team.id, matches),
      totalLosses: totalLossesHome(team.id, matches),
      goalsFavor: goalsFavor(team.id, matches),
      goalsOwn: goalsOwn(team.id, matches),
      goalsBalance: goalsBalance(team.id, matches),
      efficiency: scoreEffective(team.id, matches),
    })); positionTeams(teamsScore);
    return { status: 'SUCCESSFUL', data: teamsScore };
  }
}
