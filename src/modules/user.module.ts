import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers';
import { LoginMiddleware } from 'src/middlewares';
import { CryptService, JWTService, UsersService } from 'src/services';
import { UserRepository } from '../repositories/user.repository';

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
