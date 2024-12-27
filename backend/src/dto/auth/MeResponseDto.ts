import { ApiProperty } from '@nestjs/swagger';

export class MeResponseDto {
    @ApiProperty({
        description: "User's id",
        example: '34a710ed-64fd-4d4b-8944-4f9bbb07d29d'
    })
    readonly id: string;

    @ApiProperty({ description: "User's username", example: 'joedoe' })
    readonly username: string;

    @ApiProperty({ description: "User's email", example: 'user@example.test' })
    readonly email: string;

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
