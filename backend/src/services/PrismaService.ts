import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    withExtensions() {
        return this.$extends({
            query: {
                user: {
                    // @TODO Add update too
                    async create({ args, query }) {
                        if (args.data.password) {
                            args.data.password = await hash(
                                args.data.password,
                                10
                            );
                        }

                        return query(args);
                    }
                }
            }
        });
    }
}
