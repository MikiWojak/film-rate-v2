import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class RoleRepository {
    constructor(private prisma: PrismaService) {}

    findByName(name: string): Promise<Role | null> {
        return this.prisma.role.findUnique({ where: { name } });
    }
}
