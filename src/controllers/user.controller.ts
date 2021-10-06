import { Controller, Get, Response } from '@nestjs/common';
import { ProfileResponse } from 'src/dtos/profile-response';
import { UsersService } from '../services';

@Controller()
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async profile(@Response() res): Promise<ProfileResponse> {
    const userId = res.locals.userId;
    const user = await this.usersService.findById(userId);

    return res.send({
      name: user.name,
    } as ProfileResponse);
  }
}
