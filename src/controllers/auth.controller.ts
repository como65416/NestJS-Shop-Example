import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CryptService, JWTService, UsersService } from '../services';
import { LoginRequest, LoginResponse } from '../dtos/';

@Controller()
export class AuthController {
  constructor(
    private cryptService: CryptService,
    private jwtService: JWTService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() req: LoginRequest): Promise<LoginResponse> {
    const username = req.username;
    const password = req.password;

    const user = await this.usersService.findByUsername(username);
    if (
      user == undefined ||
      !(await this.cryptService.validatePassword(password, user.password))
    ) {
      throw new HttpException('login failed', HttpStatus.FORBIDDEN);
    }

    return {
      token: this.jwtService.generateToken({
        userId: user.id,
        username: username,
        role: user.role,
      }),
    };
  }
}
