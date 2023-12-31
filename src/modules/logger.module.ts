import { Module } from '@nestjs/common';
import { RequestLogger } from 'src/common/request.logger';

@Module({
  imports: [],
  providers: [RequestLogger],
  controllers: [],
  exports: [RequestLogger],
})
export class LoggerModule {}
