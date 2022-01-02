import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateProfileRequest {
  @ApiProperty({
    description: 'User Name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User Email',
  })
  @IsEmail()
  email: string;
}
