import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { CacheService } from '@/services/CacheService';
import { FilmRepository } from '@/repositories/FilmRepository';
import { StoreFilmRequestDto } from '@/dto/film/StoreFilmRequestDto';

@Injectable()
export class AdminFilmService {
    constructor(
        private cacheService: CacheService,
        private filmRepository: FilmRepository
    ) {}

    async index(): Promise<BaseFilmDto[]> {
        const films = await this.filmRepository.findAll();

        return plainToInstance(BaseFilmDto, films);
    }

    async store(
        storeFilmRequestDto: StoreFilmRequestDto,
        poster: Express.Multer.File,
        createdById: string
    ) {
        const { title, description, releaseDate } = storeFilmRequestDto;

        const [, ...posterUrlParts] = poster.path.split('/');
        const posterUrl = posterUrlParts.join('/');

        const film = await this.filmRepository.create({
            title,
            posterUrl,
            description,
            releaseDate,
            createdById
        });

        await this.cacheService.cacheDel('films');

        return plainToInstance(FilmDto, film);
    }
}
