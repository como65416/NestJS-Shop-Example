import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../services';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(private jwtService: JWTService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwtService.getTokenData(token);
      res.locals.userId = payload.userId;
      res.locals.role = payload.role;
    } catch (e) {
      throw new HttpException('token not validated', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
