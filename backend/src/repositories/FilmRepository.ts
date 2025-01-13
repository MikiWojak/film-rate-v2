import { Film } from '@prisma/client';
import * as deepmerge from 'deepmerge';
import { Injectable } from '@nestjs/common';
import { isPlainObject } from 'is-plain-object';

import { PrismaService } from '@/services/PrismaService';

@Injectable()
export class FilmRepository {
    constructor(private prisma: PrismaService) {}

    findAll(options = {}): Promise<Film[]> {
        const args = deepmerge(
            options,
            {
                omit: {
                    description: true,
                    releaseDate: true
                }
            },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.film.findMany(args);
    }

    findById(id: string, options = {}): Promise<Film | null> {
        const args = deepmerge(
            options,
            { where: { id } },
            { isMergeableObject: isPlainObject }
        );

        return this.prisma.film.findFirst(args);
    }

    update(data, where) {
        return this.prisma.film.update({
            data,
            where
        });
    }
}
