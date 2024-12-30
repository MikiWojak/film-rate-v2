import { ApiProperty } from '@nestjs/swagger';
import { BaseFilmDto } from '@/dto/film/BaseFilmDto';

export class FilmDto extends BaseFilmDto {
    @ApiProperty({
        description: "Film's description",
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    })
    readonly description: string;

    @ApiProperty({ description: "Film's release date", example: '2024-09-23' })
    readonly releaseDate: string;
}
