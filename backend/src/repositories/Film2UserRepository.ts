import { Film2User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class Film2UserRepository {
    constructor(private prisma: PrismaService) {}

    rate(
        filmId: string,
        userId: string,
        rate: number,
        tx: any = this.prisma
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

    removeRate(filmId: string, userId: string, tx: any = this.prisma) {
        return tx.film2User.delete({
            where: {
                filmId_userId: { filmId, userId }
            }
        });
    }

    async countAvgRate(filmId: string, tx: any = this.prisma): Promise<number> {
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
