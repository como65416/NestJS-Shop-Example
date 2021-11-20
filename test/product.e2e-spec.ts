import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ProductEntity, UserEntity } from '../src/entities';
import { ProductRepository, UserRepository } from '../src/repositories';
import { ProductSeed, UserSeed } from './seeds';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let conn: Connection;
  let productRepository: ProductRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
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
    userRepository = moduleFixture.get(UserRepository);
    productRepository = moduleFixture.get(ProductRepository);
    conn = productRepository.manager.connection;
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    productRepository.clear();
    userRepository.clear();
    conn.query("DELETE FROM sqlite_sequence WHERE name = 'product'");
    await UserSeed.insertCommonProducts(userRepository);
    await ProductSeed.insertCommonProducts(productRepository);
  });

  it('GET Normal type product', async () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({
        products: [
          { id: 1, name: '包子', price: 32 },
          { id: 3, name: '饅頭', price: 35 },
        ],
      });
  });

  it('GET VIP products failed (not login)', async () => {
    return request(app.getHttpServer()).get('/vip-products').expect(401);
  });

  it('GET VIP products failed (not vip member)', async () => {
    const resp = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'bob.accounnt',
        password: 'pAsSWord',
      })
      .expect(200);

    const authToken = resp.body.token;

    return request(app.getHttpServer())
      .get('/vip-products')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(403);
  });

  it('GET VIP products success', async () => {
    const resp = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'alice.accounnt',
        password: 'pAsSWord',
      })
      .expect(200);

    const authToken = resp.body.token;

    return request(app.getHttpServer())
      .get('/vip-products')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect({
        products: [{ id: 2, name: '黃金開口笑', price: 34 }],
      });
  });
});
