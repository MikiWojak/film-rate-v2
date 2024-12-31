import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
    @ApiProperty({ description: 'Error message', example: 'Not Found' })
    readonly message: string;

    @ApiProperty({ description: 'HTTP status code', example: '404' })
    readonly statusCode: number;
}
