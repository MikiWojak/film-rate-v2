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
    ApiBadRequestResponse,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { Public } from '@/decorators/Public';
import { AuthService } from '@/services/AuthService';
import { MeResponseDto } from '@/dto/auth/MeResponseDto';
import { ErrorResponse } from '@/dto/common/ErrorResponse';
import { LoginRequestDto } from '@/dto/auth/LoginRequestDto';
import { TokenResponseDto } from '@/dto/auth/TokenResponseDto';
import { BadRequestErrorResponse } from '@/dto/common/BadRequestErrorResponse';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Login to existing account',
        description: 'Endpoint for logging in to an existing account'
    })
    @ApiOkResponse({
        description: 'Access token',
        type: TokenResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadRequestErrorResponse
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ErrorResponse
    })
    login(@Body() loginRequestDto: LoginRequestDto): Promise<TokenResponseDto> {
        return this.authService.login(loginRequestDto);
    }

    // @TODO Type for request
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get logged user's data",
        description: "Endpoint for getting logged user's data"
    })
    @ApiOkResponse({
        description: "Logged user's data",
        type: MeResponseDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: ErrorResponse
    })
    me(@Request() req): Promise<MeResponseDto> {
        return this.authService.me(req.user.sub);
    }
}
