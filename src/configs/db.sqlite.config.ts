import { ProductEntity, UserEntity } from '../entities';

export default {
  name: 'default',
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [UserEntity, ProductEntity],
  synchronize: true,
};
