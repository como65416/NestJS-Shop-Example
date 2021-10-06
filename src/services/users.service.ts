import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }
}
