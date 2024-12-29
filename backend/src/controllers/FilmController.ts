import { Get, Controller } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@/decorators/Public';
import { FilmService } from '@/services/FilmService';
import { SingleFilmDto } from '@/dto/film/SingleFilmDto';

@ApiTags('films')
@Controller('api/v1/films')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get films' })
    @ApiOkResponse({
        description: 'Films data',
        type: [SingleFilmDto]
    })
    index(): Promise<SingleFilmDto[]> {
        return this.filmService.index();
    }
}
