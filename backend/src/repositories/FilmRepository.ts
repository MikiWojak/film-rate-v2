import { Film } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';

import type { PrismaTransaction } from '@/types/prisma';

@Injectable()
export class FilmRepository {
    constructor(private prisma: PrismaService) {}

    findAll({ userId = null }: { userId?: string | null } = {}) {
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
                releaseDate: true,
                createdById: true
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

    create({
        title,
        posterUrl,
        description,
        releaseDate,
        createdById
    }: {
        title: string;
        posterUrl: string;
        description: string;
        releaseDate: string;
        createdById: string;
    }) {
        return this.prisma.film.create({
            data: {
                title,
                posterUrl,
                description,
                releaseDate,
                createdBy: {
                    connect: { id: createdById }
                }
            }
        });
    }

    update(
        data: { avgRate?: number },
        where: { id: string },
        tx: PrismaService | PrismaTransaction = this.prisma
    ) {
        return tx.film.update({
            data,
            where
        });
    }
}
