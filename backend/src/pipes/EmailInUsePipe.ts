import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/repositories/UserRepository';

@Injectable()
export class EmailInUsePipe implements PipeTransform {
    constructor(private readonly userRepository: UserRepository) {}

    async transform(value: string) {
        const user = await this.userRepository.findByEmail(value);

        if (user) {
            throw new BadRequestException(['email is already in use']);
        }

        return value;
    }
}
