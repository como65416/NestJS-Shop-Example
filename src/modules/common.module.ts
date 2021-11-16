import { Module } from '@nestjs/common';
import { CryptService, JWTService } from '../services';

@Module({
  imports: [],
  providers: [CryptService, JWTService],
  controllers: [],
  exports: [CryptService, JWTService],
})
export class CommonModule {}
