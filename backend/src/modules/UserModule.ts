import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/PrismaModule';
import { UserRepository } from '@/repositories/UserRepository';

@Module({
    imports: [PrismaModule],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserModule {}
