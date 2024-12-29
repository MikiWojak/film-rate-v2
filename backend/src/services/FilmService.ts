import { Injectable } from '@nestjs/common';

import { SingleFilmDto } from '@/dto/film/SingleFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';

@Injectable()
export class FilmService {
    constructor(private filmRepository: FilmRepository) {}

    index(): Promise<SingleFilmDto[]> {
        return this.filmRepository.findAll();
    }
}
