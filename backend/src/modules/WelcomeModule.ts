import { Module } from '@nestjs/common';

import { WelcomeService } from '@/services/WelcomeService';
import { WelcomeController } from '@/controllers/WelcomeController';

@Module({
    controllers: [WelcomeController],
    providers: [WelcomeService]
})
export class WelcomeModule {}
