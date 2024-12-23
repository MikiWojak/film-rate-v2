import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Module({
    providers: [
        {
            provide: PrismaService,
            useFactory: () => {
                return new PrismaService().withExtensions();
            }
        }
    ],
    exports: [PrismaService]
})
export class PrismaModule {}
