import { ApiProperty } from '@nestjs/swagger';

export class Film2UserDto {
    @ApiProperty({
        description: "Film's id",
        example: 'cc388df3-f840-4279-b0a5-6c33d833bece'
    })
    readonly filmId: string;

    @ApiProperty({
        description: "User's id",
        example: '34a710ed-64fd-4d4b-8944-4f9bbb07d29d'
    })
    readonly userId: string;

    @ApiProperty({
        description: "User's rate",
        example: 7
    })
    readonly rate: number;

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
