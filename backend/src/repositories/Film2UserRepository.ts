import { Film2User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

import type { PrismaTransaction } from '@/types/prisma';

@Injectable()
export class Film2UserRepository {
    constructor(private prisma: PrismaService) {}

    rate(
        filmId: string,
        userId: string,
        rate: number,
        tx: PrismaService | PrismaTransaction = this.prisma
    ): Promise<Film2User> {
        return tx.film2User.upsert({
            where: {
                filmId_userId: { filmId, userId }
            },
            update: {
                rate
            },
            create: {
                filmId,
                userId,
                rate
            }
        });
    }

    removeRate(
        filmId: string,
        userId: string,
        tx: PrismaService | PrismaTransaction = this.prisma
    ) {
        return tx.film2User.delete({
            where: {
                filmId_userId: { filmId, userId }
            }
        });
    }

    async countAvgRate(
        filmId: string,
        tx: PrismaService | PrismaTransaction = this.prisma
    ): Promise<number> {
        const {
            _avg: { rate }
        } = await tx.film2User.aggregate({
            _avg: {
                rate: true
            },
            where: {
                filmId
            }
        });

        return rate === null ? 0 : rate;
    }
}
