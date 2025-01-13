import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    findById(id: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { id } });
    }

    findByEmail(
        email: string,
        { includePassword = false }: { includePassword?: boolean } = {}
    ): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { email },
            ...(includePassword && {
                omit: { password: false }
            })
        });
    }

    findByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { username } });
    }

    create(data: {
        username: string;
        email: string;
        password: string;
        roleIds: string[];
    }): Promise<User> {
        const { username, email, password, roleIds } = data;

        return this.prisma.user.create({
            data: {
                username,
                email,
                password,
                role2Users: {
                    create: roleIds.map(roleId => ({
                        role: { connect: { id: roleId } }
                    }))
                }
            }
        });
    }
}
