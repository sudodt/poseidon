import { CommonModule } from './common/comnon.module';
import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, CommonModule],
})
export class AppModule {}
