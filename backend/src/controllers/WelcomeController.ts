import { Get, Controller } from '@nestjs/common';

import { Public } from '@/decorators/Public';
import { WelcomeService } from '@/services/WelcomeService';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// @TODO Endpoint descriptions
@ApiTags('welcome')
@Controller('api/v1')
export class WelcomeController {
    constructor(private readonly welcomeService: WelcomeService) {}

    @Public()
    @Get()
    @ApiOperation({
        summary: 'Show welcome message',
        description: 'Endpoint used to get welcome message'
    })
    @ApiOkResponse({
        description: 'Welcome message',
        example: 'Hello world'
    })
    getHello(): string {
        return this.welcomeService.getHello();
    }
}
