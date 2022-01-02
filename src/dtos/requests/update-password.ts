import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdatePasswordRequest {
  @ApiProperty({
    description: 'Password',
  })
  @Length(8, 30)
  password: string;
}
