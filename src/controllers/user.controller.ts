import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Response
} from '@nestjs/common';
import { UpdatePasswordRequest, UpdateProfileRequest } from '../dtos/requests';
import { ProfileResponse } from '../dtos/response/profile-response';
import { CryptService, UsersService } from '../services';

@Controller()
export class UserController {
  constructor(
    private usersService: UsersService,
    private cryptService: CryptService,
  ) {}

  @Get('/profile')
  async profile(@Response() res): Promise<ProfileResponse> {
    const userId = res.locals.userId;
    const user = await this.usersService.findById(userId);

    return res.send({
      name: user.name,
      email: user.email,
    } as ProfileResponse);
  }

  @Put('/profile')
  async updateProfile(
    @Body() req: UpdateProfileRequest,
    @Response() res,
  ): Promise<any> {
    const userId = res.locals.userId;
    await this.usersService.updateUserProfile(userId, {
      name: req.name,
      email: req.email,
    });

    return res.status(HttpStatus.NO_CONTENT).send('');
  }

  @Put('/update-password')
  async updatePassword(@Body() req: UpdatePasswordRequest, @Response() res) {
    const userId = res.locals.userId;
    await this.usersService.updatePassword(userId, req.password);

    return res.status(HttpStatus.NO_CONTENT).send('');
  }
}
