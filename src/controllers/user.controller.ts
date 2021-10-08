import {
  Controller,
  Get,
  HttpStatus,
  Put,
  Request,
  Response,
} from '@nestjs/common';
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

  @Put('/profile')
  async updateProfile(@Request() req, @Response() res): Promise<any> {
    const userId = res.locals.userId;
    const name = req.body.name;
    await this.usersService.updateUserNickname(userId, name);

    return res.status(HttpStatus.NO_CONTENT).send('');
  }
}
