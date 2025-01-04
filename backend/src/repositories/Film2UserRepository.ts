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

    // @TODO What if all rates for film are deleted?
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

        return rate;
    }
}
