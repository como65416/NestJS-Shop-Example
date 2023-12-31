import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Connection } from 'typeorm';
import { CreateUserData, UpdateUserData } from '../dtos/data';
import { UserRole } from '../enum';
import { UserRepository } from '../repositories';
import { RequestLogger } from 'src/common/request.logger';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
    private requestLogger: RequestLogger,
    private connection: Connection,
  ) {}

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }

  async findById(id: number) {
    return await this.usersRepository.findOneWithOrdersById(id);
  }

  async createUser(data: CreateUserData) {
    return await this.connection.transaction(async (entityManager) => {
      const hashPassword = await bcrypt.hash(data.password, 10);

      const usersRepository = entityManager.getCustomRepository(UserRepository);
      await usersRepository.createUser({
        username: data.username,
        password: hashPassword,
        name: data.name,
        email: data.email,
        role: UserRole.Member,
      });
    });
  }

  async updateUserProfile(userId: number, profile: UpdateUserData) {
    this.requestLogger.log(
      `User ID [${userId}] update profile start (Service)`,
    );
    const updateResult = await this.connection.transaction(
      async (entityManager) => {
        const usersRepository =
          entityManager.getCustomRepository(UserRepository);
        await usersRepository.updateUser(userId, {
          name: profile.name,
          email: profile.email,
        });
      },
    );
    this.requestLogger.log(
      `User ID [${userId}] update profile finish (Service)`,
    );

    return updateResult;
  }

  async updatePassword(userId: number, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.connection.transaction(async (entityManager) => {
      const usersRepository = entityManager.getCustomRepository(UserRepository);
      await usersRepository.updateUser(userId, {
        password: hashPassword,
      });
    });
  }
}
