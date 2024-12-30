import * as deepmerge from 'deepmerge';
import { Injectable } from '@nestjs/common';
import { isPlainObject } from 'is-plain-object';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '@/services/PrismaService';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmDto } from '@/dto/film/FilmDto';

@Injectable()
export class FilmRepository {
    constructor(private prisma: PrismaService) {}

    async findAll(options = {}): Promise<BaseFilmDto[]> {
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

        const filmsPrisma = await this.prisma.film.findMany(args);

        return plainToInstance(BaseFilmDto, filmsPrisma);
    }

    async findById(id: string, options = {}): Promise<FilmDto | null> {
        const args = deepmerge(
            options,
            { where: { id } },
            { isMergeableObject: isPlainObject }
        );

        const filmPrisma = this.prisma.film.findFirst(args);

        return plainToInstance(FilmDto, filmPrisma);
    }
}
