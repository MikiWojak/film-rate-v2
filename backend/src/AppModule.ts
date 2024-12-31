import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from '@/modules/AuthModule';
import { FilmModule } from '@/modules/FilmModule';
import { WelcomeModule } from '@/modules/WelcomeModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveRoot: '/public',
            serveStaticOptions: {
                index: false,
                redirect: false,
                fallthrough: false
            }
        }),
        AuthModule,
        FilmModule,
        WelcomeModule
    ]
})
export class AppModule {}
