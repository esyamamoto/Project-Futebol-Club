import { Request, Response, Router } from 'express';
import TeamsController from '../controller/teams.controller';
// instancia
const TeamsControllerINST = new TeamsController();
const routerInstance = Router();

// rota all teams
routerInstance.get('/', (req: Request, res: Response) => {
  TeamsControllerINST.findAll(req, res);
});
// pegar por id
routerInstance.get('/:id', (req: Request, res: Response) => {
  TeamsControllerINST.findById(req, res);
});

export default routerInstance;
