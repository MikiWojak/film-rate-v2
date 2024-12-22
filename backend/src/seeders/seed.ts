import { Role } from '@/enums/Role';
import { PrismaService } from '@/services/PrismaService';

const prisma = new PrismaService().withExtensions();

async function main() {
    console.log('Seeder running');

    const [adminRole, userRole] = await Promise.all([
        prisma.role.create({ data: { name: Role.ADMIN } }),
        prisma.role.create({ data: { name: Role.USER } })
    ]);

    await Promise.all([
        prisma.user.create({
            data: {
                username: 'admin',
                email: 'admin@filmrate.test',
                password: 'Qwerty123!',
                roles: {
                    create: [
                        { role: { connect: { id: adminRole.id } } },
                        { role: { connect: { id: userRole.id } } }
                    ]
                }
            }
        }),
        prisma.user.create({
            data: {
                username: 'user',
                email: 'user@filmrate.test',
                password: 'Qwerty123!',
                roles: {
                    create: [{ role: { connect: { id: userRole.id } } }]
                }
            }
        })
    ]);

    console.log('Seeder finished');
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
