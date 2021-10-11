import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductRepository } from 'src/repositories/product.repository';
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
