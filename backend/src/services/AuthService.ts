import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { MeResponseDto } from '@/dto/auth/MeResponseDto';
import { LoginRequestDto } from '@/dto/auth/LoginRequestDto';
import { TokenResponseDto } from '@/dto/auth/TokenResponseDto';
import { UserRepository } from '@/repositories/UserRepository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async login(loginRequestDto: LoginRequestDto): Promise<TokenResponseDto> {
        const { email, password } = loginRequestDto;

        const user = await this.userRepository.findByEmail(email, {
            omit: { password: false }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id };

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    async me(id: string): Promise<MeResponseDto> {
        const fetchedUser = await this.userRepository.findById(id);

        if (!fetchedUser) {
            throw new UnauthorizedException();
        }

        const user = fetchedUser as MeResponseDto;

        return user;
    }
}
