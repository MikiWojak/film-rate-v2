import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/services/PrismaService';

@Module({
    providers: [
        {
            provide: PrismaService,
            useFactory: (configService: ConfigService) => {
                const env = configService.get<string>('NODE_ENV');

                return new PrismaService({
                    ...(env === 'development' && {
                        log: ['query', 'info', 'warn', 'error']
                    }),
                    omit: {
                        user: {
                            password: true
                        }
                    }
                }).withExtensions();
            },
            inject: [ConfigService]
        }
    ],
    exports: [PrismaService]
})
export class PrismaModule {}
