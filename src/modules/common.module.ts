import { Module } from '@nestjs/common';
import { CryptService, JWTService } from 'src/services';

@Module({
  imports: [],
  providers: [CryptService, JWTService],
  controllers: [],
  exports: [CryptService, JWTService],
})
export class CommonModule {}
