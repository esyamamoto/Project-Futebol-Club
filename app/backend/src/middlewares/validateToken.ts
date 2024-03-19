import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class ValidateToken {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenBeareer = token.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET ?? ' ';
      const decoded = jwt.verify(tokenBeareer, secret);
      res.locals.auth = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
