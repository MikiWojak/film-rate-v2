import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from '@/services/AppService';
import { AppController } from '@/controllers/AppController';
import { AuthService } from '@/services/AuthService';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthController } from '@/controllers/AuthController';
import { PrismaService } from '@/services/PrismaService';

// @TODO Separate to modules
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [
        AppService,
        AuthService,
        UserRepository,
        {
            provide: PrismaService,
            useFactory: () => {
                return new PrismaService().withExtensions();
            }
        }
    ],
    controllers: [AppController, AuthController]
})
export class AppModule {}
