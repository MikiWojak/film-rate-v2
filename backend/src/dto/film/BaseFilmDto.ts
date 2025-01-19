import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Film2UserDto } from '@/dto/film/Film2UserDto';

export class BaseFilmDto {
    @ApiProperty({
        description: "Film's id",
        example: '34a710ed-64fd-4d4b-8944-4f9bbb07d29d'
    })
    id: string;

    @ApiProperty({
        description: "Film's title",
        example: 'Saving Private Ryan'
    })
    title: string;

    @ApiProperty({
        description: "Film's poster URL",
        example: 'uploads/images/34a710ed-64fd-4d4b-8944-4f9bbb07d29e'
    })
    posterUrl: string;

    @ApiProperty({
        description: "Film's average rate - based on users rates",
        example: 7.32
    })
    avgRate: number;

    @ApiProperty({
        description: 'Timestamp - creation date',
        example: '2024-12-22T10:55:17.451Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Timestamp - last update date',
        example: '2024-12-22T10:55:17.451Z'
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description:
            'Film to user associations with rate (included for authenticated users)',
        type: Film2UserDto,
        isArray: true
    })
    film2Users?: Film2UserDto[];
}
