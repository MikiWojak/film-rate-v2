import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@/repositories/UserRepository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async login(email: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            msg: 'Hello world'
        };
    }
}
