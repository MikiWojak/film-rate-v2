import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AuthGuard } from '@/guards/AuthGuard';
import { UserModule } from '@/modules/UserModule';
import { AuthService } from '@/services/AuthService';
import { AuthController } from '@/controllers/AuthController';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get<string>('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: '60s' }
                };
            },
            inject: [ConfigService]
        })
    ],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    controllers: [AuthController]
})
export class AuthModule {}
