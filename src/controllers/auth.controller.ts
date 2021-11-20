import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Response
} from '@nestjs/common';
import { LoginRequest, RegisterRequest } from '../dtos/requests';
import { LoginResponse } from '../dtos/response';
import { CryptService, JWTService, UsersService } from '../services';

@Controller()
export class AuthController {
  constructor(
    private cryptService: CryptService,
    private jwtService: JWTService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
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

  @Post('/register')
  async register(@Body() req: RegisterRequest, @Response() res) {
    const user = await this.usersService.findByUsername(req.username);
    if (user != undefined) {
      throw new HttpException('Account exists already', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.createUser({
      username: req.username,
      password: req.password,
      name: req.name,
      email: req.email,
    });

    return res.status(HttpStatus.NO_CONTENT).send('');
  }
}
