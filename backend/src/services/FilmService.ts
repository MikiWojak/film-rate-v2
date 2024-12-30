import { Injectable } from '@nestjs/common';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';

@Injectable()
export class FilmService {
    constructor(private filmRepository: FilmRepository) {}

    index(): Promise<BaseFilmDto[]> {
        return this.filmRepository.findAll();
    }

    show(id: string): Promise<FilmDto | null> {
        return this.filmRepository.findById(id);
    }
}
