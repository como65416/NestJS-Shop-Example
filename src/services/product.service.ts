import { Injectable } from '@nestjs/common';
import { ProductListData } from 'src/dtos/data';
import { ProductType } from 'src/enum';
import { ProductRepository } from 'src/repositories';
import { Connection } from 'typeorm';

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

  async searchVIPProducts(
    keyword: string,
    page: number,
  ): Promise<ProductListData[]> {
    const products = await this.productRepository.searchProducts(
      keyword,
      page,
      ProductType.VIPOnly,
    );

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
    }));
  }
}
