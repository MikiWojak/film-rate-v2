import { plainToInstance } from 'class-transformer';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { CacheService } from '@/services/CacheService';
import { PrismaService } from '@/services/PrismaService';
import { FilmRepository } from '@/repositories/FilmRepository';
import { RateFilmRequestDto } from '@/dto/film/RateFilmRequestDto';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';

import type { Cache } from 'cache-manager';

@Injectable()
export class FilmService {
    constructor(
        private prisma: PrismaService,
        private cacheService: CacheService,
        private filmRepository: FilmRepository,
        private film2UserRepository: Film2UserRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async index(userId?: string) {
        const key = `films:index${userId ? `:${userId}` : ''}`;

        const cachedFilms: BaseFilmDto[] = await this.cacheManager.get(key);

        if (cachedFilms) {
            return plainToInstance(BaseFilmDto, cachedFilms);
        }

        const films = await this.filmRepository.findAll({ userId });

        await this.cacheManager.set(key, films);

        return plainToInstance(BaseFilmDto, films);
    }

    async show(filmId: string, userId: string | undefined): Promise<FilmDto> {
        const key = `films:show:${filmId}${userId ? `:${userId}` : ''}`;

        const cachedFilm: FilmDto = await this.cacheManager.get(key);

        if (cachedFilm) {
            return plainToInstance(FilmDto, cachedFilm);
        }

        const film = await this.filmRepository.findById(filmId, { userId });

        if (!film) {
            throw new NotFoundException();
        }

        await this.cacheManager.set(key, film);

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

        await this.cacheService.cacheDel('films');

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

        await this.cacheService.cacheDel('films');

        return Promise.resolve();
    }
}
