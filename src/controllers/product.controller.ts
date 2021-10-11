import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { SearchProductResponse } from 'src/dtos/response';
import { ProductsService } from '../services';

@Controller()
export class ProductController {
  constructor(private productsService: ProductsService) {}

  @Get('/products')
  async productList(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(0)) page: number,
  ): Promise<SearchProductResponse> {
    const searchedProducts = await this.productsService.searchProducts(
      name,
      page,
    );

    return {
      products: searchedProducts,
    };
  }
}
