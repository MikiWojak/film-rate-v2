import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/repositories/UserRepository';
import { RegisterRequestDto } from '@/dto/auth/RegisterRequestDto';

@Injectable()
export class RegisterValidationPipe implements PipeTransform {
    constructor(private readonly userRepository: UserRepository) {}

    async transform(registerRequestDto: RegisterRequestDto) {
        const { username, email, password, confirmPassword } =
            registerRequestDto;

        const errors: string[] = [];

        const userWithUsername =
            await this.userRepository.findByUsername(username);

        if (userWithUsername) {
            errors.push('Username is already in use');
        }

        const userWithEmail = await this.userRepository.findByEmail(email);

        if (userWithEmail) {
            errors.push('Email is already in use');
        }

        if (password !== confirmPassword) {
            errors.push('Password and Confirm password must match');
        }

        if (errors.length) {
            throw new BadRequestException(errors);
        }

        return registerRequestDto;
    }
}
