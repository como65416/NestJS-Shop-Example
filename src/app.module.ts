import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { CryptService, JWTService, UsersService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [CryptService, JWTService, UsersService],
})
export class AppModule {}
