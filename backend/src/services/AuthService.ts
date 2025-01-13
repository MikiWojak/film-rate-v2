import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Role } from '@/enums/Role';
import { LoginRequestDto } from '@/dto/auth/LoginRequestDto';
import { RoleRepository } from '@/repositories/RoleRepository';
import { TokenResponseDto } from '@/dto/auth/TokenResponseDto';
import { UserRepository } from '@/repositories/UserRepository';
import { ProfileResponseDto } from '@/dto/auth/ProfileResponseDto';
import { RegisterRequestDto } from '@/dto/auth/RegisterRequestDto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository,
        private jwtService: JwtService
    ) {}

    async me(id: string): Promise<ProfileResponseDto> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return plainToInstance(ProfileResponseDto, user);
    }

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

    async register(
        registerRequestDto: RegisterRequestDto
    ): Promise<ProfileResponseDto> {
        const { username, email, password } = registerRequestDto;

        const roleUser = await this.roleRepository.findByName(Role.USER);

        const user = await this.userRepository.create({
            username,
            email,
            password,
            role2Users: {
                create: [{ role: { connect: { id: roleUser.id } } }]
            }
        });

        return plainToInstance(ProfileResponseDto, user);
    }
}
