import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';
import { StoreFilmRequestDto } from '@/dto/film/StoreFilmRequestDto';

@Injectable()
export class AdminFilmService {
    constructor(private filmRepository: FilmRepository) {}

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

        return plainToInstance(FilmDto, film);
    }
}
