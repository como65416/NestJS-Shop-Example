import {
  Controller,
  DefaultValuePipe,
  Get,
  Query,
  Response,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchProductResponse } from '../dtos/response';
import { UserRole } from '../enum';
import { RoleGuard } from '../guards';
import { ProductsService } from '../services';

@ApiTags('products')
@Controller()
export class ProductController {
  constructor(private productsService: ProductsService) {}

  @Get('/products')
  @ApiResponse({
    status: 200,
    type: SearchProductResponse,
    description: 'Search Products',
  })
  async productList(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Response() res,
  ): Promise<SearchProductResponse> {
    const searchedProducts = await this.productsService.searchProducts(
      name,
      page,
    );

    return res.send({
      products: searchedProducts,
    } as SearchProductResponse);
  }

  @Get('/vip-products')
  @UseGuards(new RoleGuard([UserRole.VIPMember]))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: SearchProductResponse,
    description: 'Search VIP Products',
  })
  async vipProductList(
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Response() res,
  ): Promise<SearchProductResponse> {
    const searchedProducts = await this.productsService.searchVIPProducts(
      name,
      page,
    );

    return res.send({
      products: searchedProducts,
    } as SearchProductResponse);
  }
}
