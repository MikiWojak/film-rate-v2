import { Get, Controller, Param, NotFoundException } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiNotFoundResponse
} from '@nestjs/swagger';

import { Public } from '@/decorators/Public';
import { FilmService } from '@/services/FilmService';
import { SingleFilmDto } from '@/dto/film/SingleFilmDto';

// @TODO Endpoint descriptions
@ApiTags('films')
@Controller('api/v1/films')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @Public()
    @Get()
    @ApiOperation({
        summary: 'Get all films',
        description: 'Endpoint used to get all films'
    })
    @ApiOkResponse({
        description: 'Array with films data',
        type: [SingleFilmDto]
    })
    index(): Promise<SingleFilmDto[]> {
        return this.filmService.index();
    }

    // @TODO 404 description
    @Public()
    @Get(':id')
    @ApiOperation({
        summary: 'Get film by ID',
        description: 'Endpoint used to get film by ID'
    })
    @ApiOkResponse({
        description: "Film's data",
        type: SingleFilmDto
    })
    @ApiNotFoundResponse({})
    async show(@Param('id') id: string): Promise<SingleFilmDto> {
        const film = await this.filmService.show(id);

        if (!film) {
            throw new NotFoundException(`Film with id ${id} not found`);
        }

        return film;
    }
}
