import {
    Get,
    Body,
    Post,
    Request,
    HttpCode,
    Controller,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiOkResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { AuthGuard } from '@/guards/AuthGuard';
import { JwtAuthGuard } from '@/guards/JwtAuthGuard';
import { AuthService } from '@/services/AuthService';
import { LocalAuthGuard } from '@/guards/LocalAuthGuard';
import { MeResponseDto } from '@/dto/auth/MeResponseDto';
import { LoginRequestDto } from '@/dto/auth/LoginRequestDto';
import { TokenResponseDto } from '@/dto/auth/TokenResponseDto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login to existing account' })
    @ApiOkResponse({
        description: 'User logged in',
        type: TokenResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    login(@Request() req): Promise<TokenResponseDto> {
        console.log(req.user);

        return this.authService.login(req.user);
    }

    // @TODO How to Get User's data?
    // @TODO Type for request
    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get logged user's data" })
    @ApiOkResponse({
        description: "Logged user's data",
        type: MeResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    me(@Request() req): Promise<MeResponseDto> {
        return req.user;
    }
}
