import { Get, Controller } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { Role } from '@/enums/Role';
import { Roles } from '@/decorators/Roles';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { ErrorResponse } from '@/dto/common/ErrorResponse';
import { AdminFilmService } from '@/services/admin/AdminFilmService';
import { ExtendedErrorResponse } from '@/dto/common/ExtendedErrorResponse';

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
}
