import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

// @TODO Disable logs if not development env!
@Module({
    providers: [
        {
            provide: PrismaService,
            useFactory: () => {
                return new PrismaService({
                    log: ['query', 'info', 'warn', 'error'],
                    omit: {
                        user: {
                            password: true
                        }
                    }
                }).withExtensions();
            }
        }
    ],
    exports: [PrismaService]
})
export class PrismaModule {}
