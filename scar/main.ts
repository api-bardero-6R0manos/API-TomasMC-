import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as promBundle from 'express-prom-bundle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(promBundle({
    includeMethod: true,
    includePath: true,
    customLabels: { vip: '' },
    transformLabels: (labels, req) => {
      labels.vip = req.headers['x-vip-id'] || '';
      return labels;
    }
  }));

  await app.listen(3000);
}
bootstrap();
