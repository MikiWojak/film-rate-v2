import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/repositories/UserRepository';

@Injectable()
export class UsernameInUsePipe implements PipeTransform {
    constructor(private readonly userRepository: UserRepository) {}

    async transform(value: string) {
        const user = await this.userRepository.findByUsername(value);

        if (user) {
            throw new BadRequestException(['username is already in use']);
        }

        return value;
    }
}
