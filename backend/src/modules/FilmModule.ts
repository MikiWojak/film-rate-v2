import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';

import { FilmService } from '@/services/FilmService';
import { PrismaModule } from '@/modules/PrismaModule';
import { MulterModule } from '@nestjs/platform-express';
import { FilmController } from '@/controllers/FilmController';
import { FilmRepository } from '@/repositories/FilmRepository';
import { AdminFilmService } from '@/services/admin/AdminFilmService';
import { Film2UserRepository } from '@/repositories/Film2UserRepository';
import { AdminFilmController } from '@/controllers/admin/AdminFilmController';

@Module({
    imports: [
        PrismaModule,
        MulterModule.register({
            storage: diskStorage({
                destination: './public/uploads/images',
                filename: (req, file, cb) => {
                    const extension = file.originalname.split('.').pop();
                    const filename = `${uuidv4()}.${extension}`;

                    cb(null, filename);
                }
            })
        })
    ],
    controllers: [FilmController, AdminFilmController],
    providers: [
        FilmService,
        FilmRepository,
        AdminFilmService,
        Film2UserRepository
    ]
})
export class FilmModule {}
