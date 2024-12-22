import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from '@/services/AuthService';

@Controller('v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.email);
    }

    // @TODO refresh-token
    // @TODO logout
    // @TODO me
}
