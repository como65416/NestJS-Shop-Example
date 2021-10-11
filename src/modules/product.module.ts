import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import { LoginMiddleware } from 'src/middlewares';
import { ProductRepository } from 'src/repositories/product.repository';
import { JWTService, ProductsService } from 'src/services';

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
