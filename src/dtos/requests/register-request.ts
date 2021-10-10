import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterRequest {
  @Length(4, 20)
  username: string;

  @Length(8, 30)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
