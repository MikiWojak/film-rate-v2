import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { Role } from '@/enums/Role';
import { Roles } from '@/decorators/Roles';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';
import { AdminFilmService } from '@/services/admin/AdminFilmService';

@ApiTags('admin films')
@Controller('api/v1/admin/films')
export class AdminFilmController {
    constructor(private readonly adminFilmService: AdminFilmService) {}

    // @TODO Adjust Docs
    @Roles(Role.ADMIN)
    @Get()
    @ApiOperation({
        summary: 'Get all films',
        description: 'Endpoint for getting all films'
    })
    @ApiOkResponse({
        description: 'Array with films',
        type: [BaseFilmDto]
    })
    index(): Promise<BaseFilmDto[]> {
        return this.adminFilmService.index();
    }
}
