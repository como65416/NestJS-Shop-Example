import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse {
  @ApiProperty({
    description: 'User Name',
  })
  name: string;

  @ApiProperty({
    description: 'User Email',
  })
  email: string;
}
