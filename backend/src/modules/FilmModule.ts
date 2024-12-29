import { Module } from '@nestjs/common';

import { FilmService } from '@/services/FilmService';
import { PrismaModule } from '@/modules/PrismaModule';
import { FilmController } from '@/controllers/FilmController';
import { FilmRepository } from '@/repositories/FilmRepository';

@Module({
    imports: [PrismaModule],
    controllers: [FilmController],
    providers: [FilmService, FilmRepository]
})
export class FilmModule {}
