import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmRepository } from '@/repositories/FilmRepository';
import { RateFilmRequestDto } from '@/dto/film/RateFilmRequestDto';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';

@Injectable()
export class FilmService {
    constructor(
        private filmRepository: FilmRepository,
        private film2UserRepository: Film2UserRepository
    ) {}

    async index(userId: string | null | undefined): Promise<BaseFilmDto[]> {
        const films = await this.filmRepository.findAll({
            ...(userId && {
                include: {
                    film2Users: {
                        where: {
                            userId
                        }
                    }
                }
            })
        });

        return plainToInstance(BaseFilmDto, films);
    }

    async show(id: string): Promise<FilmDto> {
        const film = await this.filmRepository.findById(id);

        if (!film) {
            throw new NotFoundException();
        }

        return plainToInstance(FilmDto, film);
    }

    // @TODO Transactions!
    async rate(
        filmId: string,
        userId: string,
        rateFilmRequestDto: RateFilmRequestDto
    ): Promise<void> {
        const { rate } = rateFilmRequestDto;

        await this.film2UserRepository.rate(filmId, userId, rate);

        const avgRate = await this.film2UserRepository.countAvgRate(filmId);

        await this.filmRepository.update({ avgRate }, { id: filmId });

        return Promise.resolve();
    }
}
