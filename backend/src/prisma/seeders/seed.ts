import { PrismaClient } from '@prisma/client';

// @TODO Why does @ is not working?
import { Role } from '../../enums/Role';

const prisma = new PrismaClient();

// @TODO Hash passwords!
async function main() {
    const adminRole = await prisma.role.create({
        data: {
            name: Role.ADMIN
        }
    });

    const userRole = await prisma.role.create({
        data: {
            name: Role.USER
        }
    });

    await prisma.user.create({
        data: {
            username: 'admin',
            email: 'admin@filmrate.test',
            password: 'password',
            roles: {
                create: [
                    {
                        role: {
                            connect: {
                                id: adminRole.id
                            }
                        }
                    },
                    {
                        role: {
                            connect: {
                                id: userRole.id
                            }
                        }
                    }
                ]
            }
        }
    });

    await prisma.user.create({
        data: {
            username: 'user',
            email: 'user@filmrate.test',
            password: 'password',
            roles: {
                create: [
                    {
                        role: {
                            connect: {
                                id: userRole.id
                            }
                        }
                    }
                ]
            }
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
