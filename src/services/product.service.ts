import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductEntity } from 'src/entities';
import { ProductType } from 'src/enum';
import { ProductListData } from 'src/dtos/data';

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductRepository,
    private connection: Connection,
  ) {}

  async searchProducts(
    keyword: string,
    page: number,
  ): Promise<ProductListData[]> {
    const products = await this.productRepository.searchProducts(
      keyword,
      page,
      ProductType.Normal,
    );

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
    }));
  }
}
