import { Get, Controller } from '@nestjs/common';

import { WelcomeService } from '@/services/WelcomeService';
import { Public } from '@/decorators/Public';

@Controller('api/v1')
export class WelcomeController {
    constructor(private readonly appService: WelcomeService) {}

    @Public()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
