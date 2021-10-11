import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers';
import { CommonModule, UserModule, ProductModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    CommonModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AppModule {}
