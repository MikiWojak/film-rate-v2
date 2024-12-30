import * as deepmerge from 'deepmerge';
import { Injectable } from '@nestjs/common';
import { isPlainObject } from 'is-plain-object';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '@/services/PrismaService';
import { SingleFilmDto } from '@/dto/film/SingleFilmDto';

@Injectable()
export class FilmRepository {
    constructor(private prisma: PrismaService) {}

    async findAll(options = {}): Promise<SingleFilmDto[]> {
        const filmsPrisma = await this.prisma.film.findMany(options);

        return plainToInstance(SingleFilmDto, filmsPrisma);
    }

    async findById(id: string, options = {}): Promise<SingleFilmDto | null> {
        const args = deepmerge(
            options,
            { where: { id } },
            { isMergeableObject: isPlainObject }
        );

        const filmPrisma = this.prisma.film.findFirst(args);

        return plainToInstance(SingleFilmDto, filmPrisma);
    }
}
