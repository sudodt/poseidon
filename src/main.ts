import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as expressListRoutes from 'express-list-routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // expressListRoutes(app.getHttpServer()._events.request._router);
  await app.listen(3000);
}
bootstrap();
