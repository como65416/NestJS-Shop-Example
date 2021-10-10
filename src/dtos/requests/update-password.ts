import { Length } from 'class-validator';

export class UpdatePasswordRequest {
  @Length(8, 30)
  password: string;
}
