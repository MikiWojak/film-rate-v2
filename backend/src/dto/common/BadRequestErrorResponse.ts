import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorResponse {
    @ApiProperty({
        description: 'Error message or array of messages',
        oneOf: [
            { type: 'string', example: 'Validation failed (uuid is expected)' },
            {
                type: 'array',
                items: {
                    type: 'string'
                },
                example: [
                    'email must be an email',
                    'password should not be empty'
                ]
            }
        ]
    })
    readonly message: string | string[];

    @ApiProperty({ description: 'Error message', example: 'Bad Request' })
    readonly error: string;

    @ApiProperty({ description: 'HTTP status code', example: '400' })
    readonly statusCode: number;
}
