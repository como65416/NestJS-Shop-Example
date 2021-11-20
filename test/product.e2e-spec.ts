import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ProductEntity, UserEntity } from '../src/entities';
import { ProductRepository } from '../src/repositories';
import { ProductSeed } from './seeds';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let conn: Connection;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [UserEntity, ProductEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity, ProductEntity]),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    productRepository = moduleFixture.get(ProductRepository);
    conn = productRepository.manager.connection;
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    productRepository.clear();
    await ProductSeed.insertCommonProducts(productRepository);
  });

  it('GET Normal type product', async () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({
        products: [
          { id: 1, name: '包子', price: 30 },
          { id: 3, name: '饅頭', price: 30 },
        ],
      });
  });
});
