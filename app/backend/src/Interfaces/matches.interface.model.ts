import { MatchesInterface } from './macthes.interface';

export interface MatchModelInterface {
  allMatches(inProgress?: boolean): Promise<MatchesInterface[]>
  finishedMatches(id: string, match: MatchesInterface): Promise<MatchesInterface>
  updatedMatches(homeTeamGoals: number, awayTeamGoals: number,
    id: string): Promise<MatchesInterface>
  createdMatch(props: MatchesInterface): Promise<MatchesInterface>
}
