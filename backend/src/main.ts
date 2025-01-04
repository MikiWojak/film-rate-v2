import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    const frontendUrlsString = configService.get<string>('FRONTEND_URLS');
    const allowedOrigins = frontendUrlsString.split(',') || [];

    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders:
            'Content-Type, Accept, Authorization, Access-Control-Allow-Origin'
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Film Rate V2')
        .setDescription('The Film Rate V2 API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, documentFactory);

    await app.listen(configService.get<number>('PORT') ?? 3001);
}

bootstrap();
