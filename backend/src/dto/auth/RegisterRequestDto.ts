import {
    IsEmail,
    Matches,
    IsString,
    MaxLength,
    MinLength,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class RegisterRequestDto {
    @Matches(/^[a-zA-Z0-9_]+$/)
    @MaxLength(64)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({ description: "User's username", example: 'joedoe' })
    readonly username: string;

    @IsEmail({}, { message: 'Wrong email format' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({ description: "User's email", example: 'user@example.test' })
    readonly email: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({ description: "User's password", example: 'password' })
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({
        description: "User's password confirmation",
        example: 'password'
    })
    readonly confirmPassword: string;
}
