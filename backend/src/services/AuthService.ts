import { compare } from 'bcrypt';
import { User } from '@prisma/client';
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

    async validateUser(email: string, password: string): Promise<User | null> {
        const userWithPassword = await this.userRepository.findByEmail(email, {
            omit: { password: false }
        });

        if (!userWithPassword) {
            return null;
        }

        const isPasswordValid = await compare(
            password,
            userWithPassword.password
        );

        if (!isPasswordValid) {
            return null;
        }

        const user = await this.userRepository.findByEmail(email);

        return user;
    }

    async login(user: User): Promise<TokenResponseDto> {
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
