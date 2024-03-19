import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHttp';
import MatchService from '../service/matches.service';

export default class MatchController {
  constructor(
    private serviceX = new MatchService(),
  ) {}

  public async allMatches(req: Request, res: Response) {
    const goingMatches = req.query.inProgress;
    let inProgressX: boolean | undefined;
    if (typeof goingMatches === 'string') {
      inProgressX = goingMatches === 'true';
    }
    const response = await this.serviceX.allMatches(inProgressX);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async finishedMatches(req: Request, res: Response) {
    const { id } = req.params;
    const match = req.body;
    const matches = await this.serviceX.finishedMatches(id, match);
    res.status(mapStatusHTTP(matches.status)).json(matches);
  }

  public async updatedMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .serviceX.updatedMatches(homeTeamGoals, awayTeamGoals, id);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createdMatches(req: Request, res: Response) {
    const { status, data } = await this.serviceX.createdMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
