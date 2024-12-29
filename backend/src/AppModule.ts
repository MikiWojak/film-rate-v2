import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/modules/AuthModule';
import { FilmModule } from '@/modules/FilmModule';
import { WelcomeModule } from '@/modules/WelcomeModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        FilmModule,
        WelcomeModule
    ]
})
export class AppModule {}
