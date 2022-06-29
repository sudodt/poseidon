import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule.register({ folder: './config' })],
  providers: [...userProviders],
})
export class UserModule {}
