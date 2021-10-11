import { ProductEntity } from 'src/entities';
import { ProductType } from 'src/enum';
import { EntityRepository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseAbstractRepository<ProductEntity> {
  async searchProducts(
    keyword: string,
    page: number,
    type: ProductType,
  ): Promise<ProductEntity[]> {
    return await this.createQueryBuilder('product')
      .where('name like :keyword', {
        keyword: `%${keyword}%`,
      })
      .andWhere('type = :type', { type })
      .offset(page * 10)
      .limit(10)
      .getMany();
  }
}
