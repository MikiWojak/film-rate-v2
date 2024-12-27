import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/modules/UserModule';
import { AuthService } from '@/services/AuthService';
import { JwtStrategy } from '@/strategies/JwtStrategy';
import { LocalStrategy } from '@/strategies/LocalStrategy';
import { AuthController } from '@/controllers/AuthController';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get<string>('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get<string>(
                            'JWT_ACCESS_TOKEN_EXPIRATION'
                        )
                    }
                };
            },
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
