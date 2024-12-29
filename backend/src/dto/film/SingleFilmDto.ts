import { ApiProperty } from '@nestjs/swagger';

export class SingleFilmDto {
    @ApiProperty({
        description: "Film's id",
        example: '34a710ed-64fd-4d4b-8944-4f9bbb07d29d'
    })
    readonly id: string;

    @ApiProperty({
        description: "Film's title",
        example: 'Saving Private Ryan'
    })
    readonly title: string;

    @ApiProperty({
        description: "Film's poster URL",
        example: 'images/34a710ed-64fd-4d4b-8944-4f9bbb07d29e'
    })
    readonly posterUrl: string;

    @ApiProperty({
        description: "Film's description",
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    })
    readonly description: string;

    @ApiProperty({ description: "Film's release date", example: '2024-09-23' })
    readonly releaseDate: string;

    @ApiProperty({
        description: "Film's average rate - based on users rates",
        example: 7.3
    })
    readonly avgRate: number;

    @ApiProperty({
        description: 'Timestamp - creation date',
        example: '2024-12-22T10:55:17.451Z'
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Timestamp - last update date',
        example: '2024-12-22T10:55:17.451Z'
    })
    readonly updatedAt: Date;
}
