import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginRequestDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({ description: "User's email", example: 'user@example.test' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value
    )
    @ApiProperty({ description: "User's password", example: 'password' })
    readonly password: string;
}
