import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { FilmRepository } from '@/repositories/FilmRepository';

@Injectable()
export class RateValidationPipe implements PipeTransform {
    constructor(private readonly filmRepository: FilmRepository) {}

    async transform(id: string) {
        console.log({ msg: 'RateValidationPipe', id });

        const exists = await this.filmRepository.findById(id);

        if (!exists) {
            // @TODO Should I return 400 or 404?
            throw new BadRequestException(['Film does not exist']);
        }

        return id;
    }
}
