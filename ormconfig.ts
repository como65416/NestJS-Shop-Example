module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'abcd1234',
  database: 'shop',
  entities: ['./dist/**/*.entity{.ts,.js}'],
  synchronize: false,
};
