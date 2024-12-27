import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
    @ApiProperty({
        description: 'Access token for authentication',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    readonly accessToken: string;
}
