import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services';

@Controller()
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async login(): Promise<any> {
    // TODO
    return {
      xxx: 1234,
    };
  }
}
