import {
    Get,
    Body,
    Post,
    Request,
    Controller,
    UploadedFile,
    UseInterceptors,
    ParseFilePipeBuilder
} from '@nestjs/common';
import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Role } from '@/enums/Role';
import { Roles } from '@/decorators/Roles';
import { FilmDto } from '@/dto/film/FilmDto';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { ErrorResponse } from '@/dto/common/ErrorResponse';
import { AdminFilmService } from '@/services/admin/AdminFilmService';
import { StoreFilmRequestDto } from '@/dto/film/StoreFilmRequestDto';
import { ExtendedErrorResponse } from '@/dto/common/ExtendedErrorResponse';
import { BadRequestErrorResponse } from '@/dto/common/BadRequestErrorResponse';

@ApiTags('admin films')
@Controller('api/v1/admin/films')
export class AdminFilmController {
    constructor(private readonly adminFilmService: AdminFilmService) {}

    @Roles(Role.ADMIN)
    @Get()
    @ApiOperation({
        summary: 'Admin - get all films',
        description: 'Endpoint for getting all films if authorized as admin'
    })
    @ApiOkResponse({
        description: 'Array with films (`film2Users` not included!)',
        type: [BaseFilmDto]
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ExtendedErrorResponse
    })
    index(): Promise<BaseFilmDto[]> {
        return this.adminFilmService.index();
    }

    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('poster'))
    @ApiOperation({
        summary: 'Admin - add film',
        description: 'Endpoint for adding film if authorized as admin'
    })
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({
        description: "Created film's data (`film2Users` not included!)",
        type: FilmDto
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadRequestErrorResponse
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ExtendedErrorResponse
    })
    store(
        @Request() request,
        @Body()
        storeFilmRequestDto: StoreFilmRequestDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /(jpg|jpeg|png)$/
                })
                .addMaxSizeValidator({
                    maxSize: 5 * 1024 * 1024
                })
                .build()
        )
        poster: Express.Multer.File
    ) {
        return this.adminFilmService.store(
            storeFilmRequestDto,
            poster,
            request.user.sub
        );
    }
}
