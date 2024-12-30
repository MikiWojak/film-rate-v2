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
        // @TODO Fix ENOENT index.html
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveRoot: '/public',
            serveStaticOptions: {
                redirect: false,
                index: false
            }
        }),
        AuthModule,
        FilmModule,
        WelcomeModule
    ]
})
export class AppModule {}
