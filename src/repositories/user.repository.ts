import { UpdateUserData } from 'src/dtos/data';
import { EntityRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@EntityRepository(UserEntity)
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ username });
  }

  public async findOneWithOrdersById(id: number): Promise<UserEntity> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'user_order')
      .where('user.id = :userId', { userId: id })
      .getOne();

    return user;
  }

  async updateUser(userId: number, data: UpdateUserData) {
    return await this.createQueryBuilder()
      .update(UserEntity)
      .set(data)
      .where('id = :userId', { userId })
      .execute();
  }

  async createUser(user: UserEntity) {
    return await this.save(user);
  }
}
