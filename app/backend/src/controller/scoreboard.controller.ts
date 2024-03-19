import { Request, Response } from 'express';
import ScoreBoardService from '../service/scoreboard.service';

export default class ScoreboardController {
  constructor(private serviceX = new ScoreBoardService()) {}

  public async getScoreboard(req: Request, res: Response) {
    const { data } = await this.serviceX.allScoreBoard();
    return res.status(200).json(data);
  }
}
