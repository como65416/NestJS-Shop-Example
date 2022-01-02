import { ApiProperty } from '@nestjs/swagger';
import { ProductListData } from '../data/product-list-data';

export class SearchProductResponse {
  @ApiProperty({
    description: 'Product List',
    type: [ProductListData],
  })
  products: ProductListData[];
}
