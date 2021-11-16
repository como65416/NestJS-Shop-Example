import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controllers/product.controller';
import { LoginMiddleware } from '../middlewares';
import { ProductRepository } from '../repositories';
import { JWTService, ProductsService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductsService, JWTService],
  controllers: [ProductController],
  exports: [ProductsService, JWTService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('vip-products');
  }
}
