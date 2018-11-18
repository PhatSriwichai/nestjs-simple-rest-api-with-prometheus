import { NestFactory, HTTP_SERVER_REF } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './aop/http-exception.filter';
const promBundle = require("express-prom-bundle");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configMetricsMiddleware = {
    includeMethod: true,
    includePath: true,
    promClient: {
      collectDefaultMetrics: {
        timeout: 1000
      }
    }
  }
  const metricsMiddleware = promBundle(configMetricsMiddleware);
  app.use(metricsMiddleware);

  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef));
  await app.listen(3000);
}
bootstrap();
