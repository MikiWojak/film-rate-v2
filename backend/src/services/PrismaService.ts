import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    withExtensions() {
        return this.$extends({
            query: {
                user: {
                    async create({ args, query }) {
                        if (args.data.password) {
                            args.data.password = await hash(
                                args.data.password,
                                10
                            );
                        }

                        return query(args);
                    },

                    async update({ args, query }) {
                        if (
                            args.data.password &&
                            typeof args.data.password === 'string'
                        ) {
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
