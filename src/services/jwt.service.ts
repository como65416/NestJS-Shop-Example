import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTService {
  generateToken(username: string, role: string): string {
    const privateKey = process.env.JWT_KEY;

    return jwt.sign({ username, role }, privateKey, { algorithm: 'RS256' });
  }
}
