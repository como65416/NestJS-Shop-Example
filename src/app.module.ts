import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { CryptService, JWTService, UsersService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [CryptService, JWTService, UsersService, UserRepository],
})
export class AppModule {}
