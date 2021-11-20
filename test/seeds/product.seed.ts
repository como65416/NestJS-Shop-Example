import { ProductType } from '../../src/enum';
import { ProductRepository } from '../../src/repositories';

export class ProductSeed {
  static async insertCommonProducts(productRepository: ProductRepository) {
    await productRepository.save([
      {
        name: '包子',
        type: ProductType.Normal,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '黃金開口笑',
        type: ProductType.VIPOnly,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '饅頭',
        type: ProductType.Normal,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
