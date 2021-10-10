import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/dtos/data';

@Injectable()
export class JWTService {
  generateToken(payload: TokenPayload): string {
    const privateKey = process.env.JWT_KEY;

    return jwt.sign(payload, privateKey, {
      algorithm: 'HS256',
    });
  }

  getTokenData(token: string): TokenPayload {
    const privateKey = process.env.JWT_KEY;
    const payload = jwt.verify(token, privateKey);

    return {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };
  }
}
