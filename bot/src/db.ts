import { DataSource } from 'typeorm';

export function createDataSource(): DataSource {
  return new DataSource({
    type: 'mongodb',

    url: process.env.MONGO_DB_URL,
    useUnifiedTopology: true,

    entities: ['dist/app/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
  });
}

export const dataSource = createDataSource();