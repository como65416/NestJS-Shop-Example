import { EntityRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@EntityRepository(UserEntity)
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ username });
  }

  async updateNameById(userId: number, name: string) {
    return await this.createQueryBuilder()
      .update(UserEntity)
      .set({ name })
      .where('id = :userId', { userId })
      .execute();
  }
}
