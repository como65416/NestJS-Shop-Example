import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers';
import { LoginMiddleware } from 'src/middlewares';
import { JWTService, UsersService } from 'src/services';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UsersService, JWTService],
  controllers: [UserController],
  exports: [UserRepository, UsersService, JWTService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('profile');
  }
}
