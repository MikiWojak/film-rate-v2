import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async use(request: Request, response: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            request['user'] = null;

            next();

            return;
        }

        try {
            const secret = this.configService.get<string>('JWT_SECRET_KEY');
            const payload = await this.jwtService.verifyAsync(token, {
                secret
            });

            request['user'] = payload;
        } catch {
            request['user'] = null;
        }

        next();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
