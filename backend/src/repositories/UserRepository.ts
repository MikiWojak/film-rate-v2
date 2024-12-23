import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    // @TODO How to exclude password by default?
    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
}
