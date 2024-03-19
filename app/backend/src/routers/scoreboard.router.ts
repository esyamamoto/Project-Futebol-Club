import { Router, Request, Response } from 'express';
import ScoreboardController from '../controller/scoreboard.controller';

const scoreboardRouter = Router();
const scoreboardController = new ScoreboardController();

scoreboardRouter.get(
  '/home',
  (req: Request, res: Response) => {
    scoreboardController.getScoreboard(req, res);
  },
);

export default scoreboardRouter;
