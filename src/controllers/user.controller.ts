import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordRequest, UpdateProfileRequest } from '../dtos/requests';
import { ProfileResponse } from '../dtos/response/profile-response';
import { UsersService } from '../services';
import { RequestLogger } from 'src/common/request.logger';

@ApiTags('user')
@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(
    private usersService: UsersService,
    private requestLogger: RequestLogger,
  ) {}

  @Get('/profile')
  @ApiResponse({
    status: 200,
    type: ProfileResponse,
    description: 'Get user profile',
  })
  async profile(@Response() res): Promise<ProfileResponse> {
    const userId = res.locals.userId;
    const user = await this.usersService.findById(userId);

    return res.send({
      name: user.name,
      email: user.email,
      orderIds: user.orders.map((order) => order.id),
    } as ProfileResponse);
  }

  @Put('/profile')
  @ApiResponse({
    status: 201,
    description: 'Update Success',
  })
  async updateProfile(
    @Body() req: UpdateProfileRequest,
    @Response() res,
  ): Promise<any> {
    const userId = res.locals.userId;
    this.requestLogger.log(`User ID [${userId}] start update profile (API)`);
    await this.usersService.updateUserProfile(userId, {
      name: req.name,
      email: req.email,
    });

    return res.status(HttpStatus.NO_CONTENT).send('');
  }

  @Put('/update-password')
  @ApiResponse({
    status: 201,
    description: 'Update Success',
  })
  async updatePassword(@Body() req: UpdatePasswordRequest, @Response() res) {
    const userId = res.locals.userId;
    await this.usersService.updatePassword(userId, req.password);

    return res.status(HttpStatus.NO_CONTENT).send('');
  }
}
