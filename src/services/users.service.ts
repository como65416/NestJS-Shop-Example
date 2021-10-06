import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }
}
