import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserData, UpdateUserData } from 'src/dtos/data';
import { UserRole } from 'src/enum';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
    private connection: Connection,
  ) {}

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }

  async findById(id: number) {
    return await this.usersRepository.findOneById(id);
  }

  async createUser(data: CreateUserData) {
    return await this.connection.transaction(async (entityManager) => {
      const usersRepository = entityManager.getCustomRepository(UserRepository);
      await usersRepository.createUser({
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        role: UserRole.Member,
      });
    });
  }

  async updateUserProfile(userId: number, profile: UpdateUserData) {
    return await this.connection.transaction(async (entityManager) => {
      const usersRepository = entityManager.getCustomRepository(UserRepository);
      await usersRepository.updateUser(userId, {
        name: profile.name,
        email: profile.email,
      });
    });
  }

  async updatePassword(userId: number, password: string) {
    return await this.connection.transaction(async (entityManager) => {
      const usersRepository = entityManager.getCustomRepository(UserRepository);
      await usersRepository.updateUser(userId, {
        password,
      });
    });
  }
}
