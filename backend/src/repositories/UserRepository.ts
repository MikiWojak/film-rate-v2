import { User } from '@prisma/client';
import * as deepmerge from 'deepmerge';
import { Injectable } from '@nestjs/common';
import { isPlainObject } from 'is-plain-object';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    findById(id: string, options = {}): Promise<User | null> {
        const args = deepmerge(
            options,
            { where: { id } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.findFirst(args);
    }

    findByEmail(email: string, options = {}): Promise<User | null> {
        const args = deepmerge(
            options,
            { where: { email } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.findFirst(args);
    }

    findByUsername(username: string, options = {}): Promise<User | null> {
        const args = deepmerge(
            options,
            { where: { username } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.findFirst(args);
    }

    // @TODO Type for data
    create(data, options = {}) {
        const args = deepmerge(
            options,
            { data },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.user.create(args);
    }
}
