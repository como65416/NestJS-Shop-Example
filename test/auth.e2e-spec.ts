import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductEntity, UserEntity } from '../src/entities';
import { UserRepository } from '../src/repositories';
import { UserSeed } from './seeds';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'default',
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
    await app.init();
  });

  it('Login fail', async () => {
    // Insert database data
    await UserSeed.insertCommonProducts(userRepository);

    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'bob.accounnt',
        password: 'invalid.password',
      })
      .expect(403);
  });

  it('Login success', async () => {
    // Insert database data
    await UserSeed.insertCommonProducts(userRepository);

    const resp = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'bob.accounnt',
        password: 'pAsSWord',
      })
      .expect(200);

    const authToken = resp.body.token;
    return request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect({
        name: 'Bob',
        email: 'bob@example.com',
      });
  });
});
