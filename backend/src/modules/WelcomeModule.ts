import { Module } from '@nestjs/common';

import { WelcomeService } from '@/services/WelcomeService';
import { WelcomeController } from '@/controllers/WelcomeController';

@Module({
    providers: [WelcomeService],
    controllers: [WelcomeController]
})
export class WelcomeModule {}
