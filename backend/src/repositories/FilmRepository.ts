import { Injectable } from '@nestjs/common';
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
}
