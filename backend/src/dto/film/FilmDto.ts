import { ApiProperty } from '@nestjs/swagger';

import { BaseFilmDto } from '@/dto/film/BaseFilmDto';

export class FilmDto extends BaseFilmDto {
    @ApiProperty({
        description: "Film's description",
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    })
    readonly description: string;

    @ApiProperty({
        description: "Film's release date",
        example: '2012-09-21T00:00:00.000Z'
    })
    readonly releaseDate: string;
}
