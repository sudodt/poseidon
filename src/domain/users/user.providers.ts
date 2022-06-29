import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USER_RESPOSITORY } from './constants';

export const userProviders = [
  {
    provide: USER_RESPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
