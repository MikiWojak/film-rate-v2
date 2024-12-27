import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: "User's email", example: 'user@example.test' })
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({ description: "User's password", example: 'password' })
    readonly password: string;
}
