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
    ApiBearerAuth,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { FilmDto } from '@/dto/film/FilmDto';
import { Public } from '@/decorators/Public';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { FilmService } from '@/services/FilmService';
import { ErrorResponse } from '@/dto/common/ErrorResponse';
import { RateFilmRequestDto } from '@/dto/film/RateFilmRequestDto';
import { BadRequestErrorResponse } from '@/dto/common/BadRequestErrorResponse';

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
    index(@Request() request): Promise<BaseFilmDto[]> {
        return this.filmService.index(request.user?.sub);
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
    show(@Request() request, @Param('id') id: string): Promise<FilmDto> {
        return this.filmService.show(id, request.user?.sub);
    }

    @Post(':id/rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Rate film',
        description: 'Endpoint for rating film'
    })
    @ApiNoContentResponse({
        description: 'Film rated successfully'
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadRequestErrorResponse
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ErrorResponse
    })
    rate(
        @Param('id') id: string,
        @Request() request,
        @Body() rateFilmRequestDto: RateFilmRequestDto
    ): Promise<void> {
        return this.filmService.rate(id, request.user.sub, rateFilmRequestDto);
    }
}
