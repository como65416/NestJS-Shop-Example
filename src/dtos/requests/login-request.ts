import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Login Account',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Login Password',
  })
  @IsNotEmpty()
  password: string;
}
