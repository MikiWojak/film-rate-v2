import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class RateFilmRequestDto {
    @Max(10)
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Rate of a film',
        example: 7
    })
    readonly rate: number;
}
