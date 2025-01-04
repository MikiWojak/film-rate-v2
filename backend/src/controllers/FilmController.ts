import {
    Get,
    Post,
    Body,
    Param,
    Request,
    HttpCode,
    Controller,
    HttpStatus
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiNotFoundResponse
} from '@nestjs/swagger';

import { FilmDto } from '@/dto/film/FilmDto';
import { Public } from '@/decorators/Public';
import { FilmService } from '@/services/FilmService';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { ErrorResponse } from '@/dto/common/ErrorResponse';
import { RateFilmRequestDto } from '@/dto/film/RateFilmRequestDto';

@ApiTags('films')
@Controller('api/v1/films')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @Public()
    @Get()
    @ApiOperation({
        summary: 'Get all films',
        description: 'Endpoint for getting all films'
    })
    @ApiOkResponse({
        description: 'Array with films data',
        type: [BaseFilmDto]
    })
    index(): Promise<BaseFilmDto[]> {
        return this.filmService.index();
    }

    @Public()
    @Get(':id')
    @ApiOperation({
        summary: 'Get film by ID',
        description: 'Endpoint for getting film by ID'
    })
    @ApiOkResponse({
        description: "Film's data",
        type: FilmDto
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
        type: ErrorResponse
    })
    show(@Param('id') id: string): Promise<FilmDto> {
        return this.filmService.show(id);
    }

    // @TODO Type for request
    // @TODO Check if user and film exist before entering the endpoint
    // @TODO Docs
    @Post(':id/rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    rate(
        @Param('id') id: string,
        @Request() req,
        @Body() rateFilmRequestDto: RateFilmRequestDto
    ): Promise<void> {
        // @TODO Pass user too
        return this.filmService.rate(id, req.user.sub, rateFilmRequestDto);
    }
}
