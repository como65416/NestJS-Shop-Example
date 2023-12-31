import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import SQLiteDatabaseConfig from './configs/db.sqlite.config';
import { AuthController } from './controllers';
import { CommonModule, ProductModule, UserModule } from './modules';
import { LoggerModule } from './modules/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // If it's run on test, don't connect to real database
        if (process.env.NODE_ENV == 'test') {
          return SQLiteDatabaseConfig;
        }

        return Object.assign(await getConnectionOptions());
      },
    }),
    ConfigModule.forRoot(),
    CommonModule,
    UserModule,
    ProductModule,
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AppModule {}
