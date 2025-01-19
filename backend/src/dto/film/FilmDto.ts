import { ApiProperty } from '@nestjs/swagger';

import { BaseFilmDto } from '@/dto/film/BaseFilmDto';

export class FilmDto extends BaseFilmDto {
    @ApiProperty({
        description: "Film's description",
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    })
    description: string;

    @ApiProperty({
        description: "Film's release date",
        example: '2012-09-21T00:00:00.000Z'
    })
    releaseDate: string;

    @ApiProperty({
        description: 'ID of user who entered the film to system',
        example: 'f6412c57-0a83-4d02-ba91-6b7bbebc491c'
    })
    createdById: string;
}
