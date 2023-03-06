import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'dev.sqlite',
  entities: ['**/*.entity.js'],
});

export default AppDataSource;
