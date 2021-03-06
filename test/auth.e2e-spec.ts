import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import SQLiteDatabaseConfig from '../src/configs/db.sqlite.config';
import { ProductEntity, UserEntity } from '../src/entities';
import { UserRepository } from '../src/repositories';
import { UserSeed } from './seeds';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let conn: Connection;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(SQLiteDatabaseConfig as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([UserEntity, ProductEntity]),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(UserRepository);
    conn = userRepository.manager.connection;
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    userRepository.clear();
    await UserSeed.insertCommonProducts(userRepository);
  });

  it('Login fail', async () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'bob.accounnt',
        password: 'invalid.password',
      })
      .expect(403);
  });

  it('Login success', async () => {
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
