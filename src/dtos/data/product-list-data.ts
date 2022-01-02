import { ApiProperty } from '@nestjs/swagger';

export class ProductListData {
  @ApiProperty({
    description: 'Product ID',
  })
  id: number;

  @ApiProperty({
    description: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'Price',
  })
  price: number;
}
