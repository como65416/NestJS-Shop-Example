import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { LoginMiddleware } from '../middlewares';
import { UserRepository } from '../repositories/user.repository';
import { CryptService, JWTService, UsersService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService, JWTService, CryptService],
  controllers: [UserController],
  exports: [UsersService, JWTService, CryptService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('profile', 'update-password');
  }
}
