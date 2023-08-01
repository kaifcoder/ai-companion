const {PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Famous Peoples' },
                { name: 'Movies & TV' },
                { name: 'Musicians' },
                { name: 'Animals' },
                { name: 'Games' },
                { name: 'Philosophy' },
                { name: 'Scientist' },
            ]
        });
    }
    catch (err) {
        console.error(err);
    } finally {
        await db.$disconnect();
    }
}

main();