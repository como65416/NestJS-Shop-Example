import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductEntity, UserEntity } from '../src/entities';
import { ProductType } from '../src/enum';
import { ProductRepository } from '../src/repositories';

describe('AppController (e2e)', () => {
  let app: INestApplication;
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
    await app.init();
  });

  it('GET Normal type product', async () => {
    // Insert database data
    await productRepository.save([
      {
        name: '包子',
        type: ProductType.Normal,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '黃金開口笑',
        type: ProductType.VIPOnly,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '饅頭',
        type: ProductType.Normal,
        remainingAmount: 30,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Test api response
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
