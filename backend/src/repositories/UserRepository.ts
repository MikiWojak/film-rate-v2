import { User } from '@prisma/client';
import * as deepmerge from 'deepmerge';
import { Injectable } from '@nestjs/common';
import { isPlainObject } from 'is-plain-object';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    findByEmail(email: string, options = {}): Promise<User | null> {
        const args = deepmerge(
            options,
            { where: { email } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.findFirst(args);
    }

    findById(id: string, options = {}): Promise<User | null> {
        const args = deepmerge(
            options,
            { where: { id } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.findFirst(args);
    }
}
