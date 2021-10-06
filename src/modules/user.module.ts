import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers';
import { LoginMiddleware } from 'src/middlewares';
import { JWTService, UsersService } from 'src/services';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService, JWTService],
  controllers: [UserController],
  exports: [UsersService, JWTService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('profile');
  }
}
