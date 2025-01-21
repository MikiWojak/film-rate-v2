import {
    IsString,
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsDateString
} from 'class-validator';
import * as dayjs from 'dayjs';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class StoreFilmRequestDto {
    @MaxLength(255)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({
        description: "Film's title",
        example: 'Saving Private Ryan'
    })
    readonly title: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: "Film's poster"
    })
    poster: Express.Multer.File;

    @MaxLength(5000)
    @MinLength(20)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({
        description: "Film's description",
        example:
            'Group of soldiers is supposed to save a private whose brothers already fell in WW2'
    })
    readonly description: string;

    @Transform(({ value }: TransformFnParams) =>
        dayjs(value).endOf('day').format()
    )
    @IsDateString({}, { message: 'Release date - invalid date format' })
    @IsNotEmpty()
    @ApiProperty({
        description: "Film's release date",
        example: '1998-09-11'
    })
    readonly releaseDate: string;
}
