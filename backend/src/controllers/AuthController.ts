import {
    Get,
    Body,
    Post,
    Request,
    HttpCode,
    Controller,
    HttpStatus
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiOkResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { Public } from '@/decorators/Public';
import { AuthService } from '@/services/AuthService';
import { MeResponseDto } from '@/dto/auth/MeResponseDto';
import { LoginRequestDto } from '@/dto/auth/LoginRequestDto';
import { TokenResponseDto } from '@/dto/auth/TokenResponseDto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Login to existing account',
        description: 'Endpoint used to login to existing account'
    })
    @ApiOkResponse({
        description: 'User logged in',
        type: TokenResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    login(@Body() loginRequestDto: LoginRequestDto): Promise<TokenResponseDto> {
        return this.authService.login(loginRequestDto);
    }

    // @TODO Type for request
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get logged user's data",
        description: "Endpoint used to get logged user's data"
    })
    @ApiOkResponse({
        description: "Logged user's data",
        type: MeResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    me(@Request() req): Promise<MeResponseDto> {
        return this.authService.me(req.user.sub);
    }
}
