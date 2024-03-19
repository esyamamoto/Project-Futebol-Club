import { Router, Request, Response } from 'express';
import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateLogin';
import ValidateToken from '../middlewares/validateToken';

const routerInstance = Router();

const userController = new UserController();
routerInstance.post(
  '/',
  ValidateLogin.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);
routerInstance.get('/role', ValidateToken.validateToken, (req: Request, res: Response) =>
  UserController.validateTokenRole(req, res));

export default routerInstance;
