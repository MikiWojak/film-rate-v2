import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

// @TODO Check transform
export class RegisterRequestDto {
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_]+$/)
    @ApiProperty({ description: "User's username", example: 'joedoe' })
    readonly username: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: "User's email", example: 'user@example.test' })
    readonly email: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ description: "User's password", example: 'password' })
    readonly password: string;

    // @TODO Same as password
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @ApiProperty({
        description: "User's password confirmation",
        example: 'password'
    })
    readonly confirmPassword: string;
}
