import { IsEmail, IsNotEmpty } from 'class-validator';

export class ProfileResponse {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
