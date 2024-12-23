import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from '@/repositories/UserRepository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    // @TODO Return type
    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByEmail(email);

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
}
