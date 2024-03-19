import { MatchesInterface, ScoreboardInterface } from '../../Interfaces/macthes.interface';

const totalGamesHome = (teamId: number, matches: MatchesInterface[]): number => {
  const allGames = matches.filter((match) => match.homeTeamId === teamId);
  return allGames.length;
};

const totalVictoriesAway = (teamId: number, matches: MatchesInterface[]): number => {
  const winAway = matches
    .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals);
  return winAway.length;
};

const totalVictoryHome = (teamId: number, matches: MatchesInterface[]): number => {
  const winHome = matches
    .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals);
  return winHome.length;
};

const totalLossesHome = (teamId: number, matches: MatchesInterface[]): number => {
  const lossesHome = matches
    .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  return lossesHome.length;
};

const totalLossesAway = (teamId: number, matches: MatchesInterface[]): number => {
  const lossesAway = matches
    .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
  return lossesAway.length;
};

const totalDrawsHome = (teamId: number, matches: MatchesInterface[]): number => {
  const drawHome = matches.filter((match) => match
    .homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals);
  return drawHome.length;
};

const totalPointsHome = (teamId: number, matches: MatchesInterface[]): number => {
  const totalPoints = totalVictoryHome(teamId, matches);
  const AllDraws = totalDrawsHome(teamId, matches);
  return (totalPoints * 3) + AllDraws;
};

const goalsFavor = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsFavorX = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return goalsFavorX;
};

const goalsOwn = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsOwnX = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  return goalsOwnX;
};

const goalsBalance = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsBalanceX = goalsFavor(teamId, matches) - goalsOwn(teamId, matches);
  return goalsBalanceX;
};

const scoreEffective = (teamId: number, matches: MatchesInterface[]): string => {
  const totalPoints = totalPointsHome(teamId, matches);
  const totalGames = totalGamesHome(teamId, matches);
  const totalEfficiency = (((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return totalEfficiency;
};

const positionTeams = (team: ScoreboardInterface[]): ScoreboardInterface[] => {
  const positions = team.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    return 0;
  });
  return positions;
};

export {
  totalGamesHome,
  totalVictoriesAway,
  totalVictoryHome,
  totalLossesHome,
  totalLossesAway,
  totalDrawsHome,
  totalPointsHome,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  scoreEffective,
  positionTeams,
};
