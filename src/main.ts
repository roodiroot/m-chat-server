import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(PORT, () => {
    console.log(`Server start on PORT  ${PORT}`);
  });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
