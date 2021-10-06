import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { CryptService, JWTService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), UserModule],
  controllers: [AuthController],
  providers: [CryptService, JWTService],
})
export class AppModule {}
