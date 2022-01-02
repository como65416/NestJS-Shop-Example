import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    description: 'Account',
  })
  @Length(4, 20)
  username: string;

  @Length(8, 30)
  @ApiProperty({
    description: 'Password',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User Name',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'User Email',
  })
  email: string;
}
