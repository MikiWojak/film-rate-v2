import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';

@Injectable()
export class FilmService {
    constructor(private filmRepository: FilmRepository) {}

    index(): Promise<BaseFilmDto[]> {
        return this.filmRepository.findAll();
    }

    async show(id: string): Promise<FilmDto> {
        const film = await this.filmRepository.findById(id);

        if (!film) {
            throw new NotFoundException();
        }

        return film;
    }
}
