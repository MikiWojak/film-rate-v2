import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorResponse {
    @ApiProperty({
        description: 'Error messages array',
        example: ['email must be an email', 'password should not be empty']
    })
    readonly message: string[];

    @ApiProperty({ description: 'Error message', example: 'Bad Request' })
    readonly error: string;

    @ApiProperty({ description: 'HTTP status code', example: '400' })
    readonly statusCode: string;
}
