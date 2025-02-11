import {
    Module,
    NestModule,
    RequestMethod,
    MiddlewareConsumer
} from '@nestjs/common';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from '@/modules/AuthModule';
import { FilmModule } from '@/modules/FilmModule';
import { WelcomeModule } from '@/modules/WelcomeModule';
import { JwtMiddleware } from '@/middleware/JwtMiddleware';
import { DeleteFileOnErrorFilter } from '@/filters/DeleteFileOnErrorFilter';

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
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore({
                    socket: {
                        host: configService.get<string>('REDIS_CACHE_HOST'),
                        port: configService.get<number>('REDIS_CACHE_PORT')
                    },
                    password: configService.get<string>('REDIS_CACHE_PASS'),
                    ttl: configService.get<number>('REDIS_CACHE_TTL')
                })
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        FilmModule,
        WelcomeModule
    ],
    providers: [
        JwtService,
        {
            provide: APP_FILTER,
            useClass: DeleteFileOnErrorFilter
        }
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .exclude({ path: '/api/v1/auth/login', method: RequestMethod.POST })
            .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
    }
}
