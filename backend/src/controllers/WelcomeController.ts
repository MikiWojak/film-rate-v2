import { Get, Controller } from '@nestjs/common';

import { Public } from '@/decorators/Public';
import { WelcomeService } from '@/services/WelcomeService';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('welcome')
@Controller('api/v1')
export class WelcomeController {
    constructor(private readonly appService: WelcomeService) {}

    @Public()
    @Get()
    @ApiOperation({ summary: 'Show welcome message' })
    @ApiOkResponse({
        description: 'Welcome message',
        example: 'Hello world'
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
