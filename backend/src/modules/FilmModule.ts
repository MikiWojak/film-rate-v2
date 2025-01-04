import { Module } from '@nestjs/common';

import { FilmService } from '@/services/FilmService';
import { PrismaModule } from '@/modules/PrismaModule';
import { FilmController } from '@/controllers/FilmController';
import { FilmRepository } from '@/repositories/FilmRepository';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';

@Module({
    imports: [PrismaModule],
    controllers: [FilmController],
    providers: [FilmRepository, Film2UserRepository, FilmService]
})
export class FilmModule {}
