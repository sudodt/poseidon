import { DataSource } from 'typeorm';
import { DATABASE_CONNECTION } from './constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: 'server-mongodb:27017',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
