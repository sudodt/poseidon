import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required().default('server-mongodb'),
        DATABASE_PORT: Joi.number().default(27017),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    UserModule,
  ],
})
export class AppModule {}
