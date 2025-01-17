import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';

@Injectable()
export class AdminFilmService {
    constructor(private filmRepository: FilmRepository) {}

    async index(): Promise<BaseFilmDto[]> {
        const films = await this.filmRepository.findAll();

        return plainToInstance(BaseFilmDto, films);
    }
}
