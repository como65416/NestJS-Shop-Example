import { ProductType } from '../../src/enum';
import { ProductRepository } from '../../src/repositories';

export class ProductSeed {
  static async insertCommonProducts(productRepository: ProductRepository) {
    await productRepository.save([
      {
        id: 1,
        name: '包子',
        type: ProductType.Normal,
        remainingAmount: 20,
        price: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: '黃金開口笑',
        type: ProductType.VIPOnly,
        remainingAmount: 10,
        price: 34,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: '饅頭',
        type: ProductType.Normal,
        remainingAmount: 30,
        price: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
