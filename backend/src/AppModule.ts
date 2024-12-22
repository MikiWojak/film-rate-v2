import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from '@/services/AppService';
import { PrismaService } from '@/services/PrismaService';
import { AppController } from '@/controllers/AppController';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: PrismaService,
            useFactory: () => {
                return new PrismaService().withExtensions();
            }
        }
    ]
})
export class AppModule {}
