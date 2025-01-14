import { Film } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class FilmRepository {
    constructor(private prisma: PrismaService) {}

    findAll({ userId = null }: { userId: string | null }) {
        return this.prisma.film.findMany({
            ...(userId && {
                include: {
                    film2Users: {
                        where: {
                            userId
                        }
                    }
                }
            }),
            omit: {
                description: true,
                releaseDate: true
            }
        });
    }

    findById(
        id: string,
        { userId = null }: { userId?: string | null } = {}
    ): Promise<Film | null> {
        return this.prisma.film.findFirst({
            where: {
                id
            },
            ...(userId && {
                include: {
                    film2Users: {
                        where: {
                            userId
                        }
                    }
                }
            })
        });
    }

    update(data: { avgRate?: number }, where: { id: string }) {
        return this.prisma.film.update({
            data,
            where
        });
    }
}
