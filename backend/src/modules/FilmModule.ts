import { Module } from '@nestjs/common';

import { FilmService } from '@/services/FilmService';
import { PrismaModule } from '@/modules/PrismaModule';
import { FilmController } from '@/controllers/FilmController';
import { FilmRepository } from '@/repositories/FilmRepository';
import { AdminFilmService } from '@/services/admin/AdminFilmService';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';
import { AdminFilmController } from '@/controllers/admin/AdminFilmController';

@Module({
    imports: [PrismaModule],
    controllers: [FilmController, AdminFilmController],
    providers: [
        FilmService,
        FilmRepository,
        AdminFilmService,
        Film2UserRepository
    ]
})
export class FilmModule {}
