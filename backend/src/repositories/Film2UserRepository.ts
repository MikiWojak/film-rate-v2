import { Film2User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class Film2UserRepository {
    constructor(private prisma: PrismaService) {}

    rate(filmId: string, userId: string, rate: number): Promise<Film2User> {
        return this.prisma.film2User.upsert({
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

    removeRate(filmId: string, userId: string) {
        return this.prisma.film2User.deleteMany({
            where: {
                filmId,
                userId
            }
        });
    }

    async countAvgRate(filmId: string): Promise<number> {
        const {
            _avg: { rate }
        } = await this.prisma.film2User.aggregate({
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
