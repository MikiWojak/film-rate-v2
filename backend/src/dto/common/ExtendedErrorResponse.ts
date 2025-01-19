import { ApiProperty } from '@nestjs/swagger';

import { ErrorResponse } from '@/dto/common/ErrorResponse';

export class ExtendedErrorResponse extends ErrorResponse {
    @ApiProperty({ description: 'Error message', example: 'Not Found' })
    readonly error: string;
}
