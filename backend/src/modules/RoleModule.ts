import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/PrismaModule';
import { RoleRepository } from '@/repositories/RoleRepository';

@Module({
    imports: [PrismaModule],
    providers: [RoleRepository],
    exports: [RoleRepository]
})
export class RoleModule {}
