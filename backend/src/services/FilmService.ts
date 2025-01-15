import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { PrismaService } from '@/services/PrismaService';
import { FilmRepository } from '@/repositories/FilmRepository';
import { RateFilmRequestDto } from '@/dto/film/RateFilmRequestDto';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';

@Injectable()
export class FilmService {
    constructor(
        private prisma: PrismaService,
        private filmRepository: FilmRepository,
        private film2UserRepository: Film2UserRepository
    ) {}

    async index(userId?: string): Promise<BaseFilmDto[]> {
        const films = await this.filmRepository.findAll({ userId });

        return plainToInstance(BaseFilmDto, films);
    }

    async show(filmId: string, userId: string | undefined): Promise<FilmDto> {
        const film = await this.filmRepository.findById(filmId, { userId });

        if (!film) {
            throw new NotFoundException();
        }

        return plainToInstance(FilmDto, film);
    }

    async rate(
        filmId: string,
        userId: string,
        rateFilmRequestDto: RateFilmRequestDto
    ): Promise<void> {
        const film = await this.filmRepository.findById(filmId);

        if (!film) {
            throw new NotFoundException();
        }

        const { rate } = rateFilmRequestDto;

        await this.prisma.$transaction(async tx => {
            await this.film2UserRepository.rate(filmId, userId, rate, tx);

            const avgRate = await this.film2UserRepository.countAvgRate(
                filmId,
                tx
            );

            await this.filmRepository.update({ avgRate }, { id: filmId }, tx);
        });

        return Promise.resolve();
    }

    async removeRate(filmId: string, userId: string): Promise<void> {
        const film = await this.filmRepository.findById(filmId);

        if (!film) {
            throw new NotFoundException();
        }

        await this.prisma.$transaction(async tx => {
            await this.film2UserRepository.removeRate(filmId, userId, tx);

            const avgRate = await this.film2UserRepository.countAvgRate(
                filmId,
                tx
            );

            await this.filmRepository.update({ avgRate }, { id: filmId }, tx);
        });

        return Promise.resolve();
    }
}
