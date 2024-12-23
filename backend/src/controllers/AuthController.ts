import {
    Get,
    Body,
    Post,
    Request,
    HttpCode,
    Controller,
    HttpStatus
} from '@nestjs/common';

import { Public } from '@/decorators/Public';
import { AuthService } from '@/services/AuthService';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.email, signInDto.password);
    }

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
