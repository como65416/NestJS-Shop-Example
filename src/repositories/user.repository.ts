import { EntityRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@EntityRepository(UserEntity)
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ username });
  }
}
