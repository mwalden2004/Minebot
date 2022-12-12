import { DataSource } from 'typeorm';

export function createDataSource(): DataSource {
  return new DataSource({
    type: 'mongodb',

    url: 'mongodb+srv://mwalden:NJOXr9p2KvLzcRY5@cluster0.bt5v83e.mongodb.net',

    entities: ['build/app/**/*.entity.js'],
    migrations: ['build/migrations/*.js'],
  });
}

export const dataSource = createDataSource();