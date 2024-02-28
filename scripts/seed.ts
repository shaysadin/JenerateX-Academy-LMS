const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "AI For Business" },
                { name: "AI For Developer" },
                { name: "AI For Productivity" },
                { name: "AI For content creators" },
                { name: "AI For Designers" },
                { name: "AI For Research" },
                { name: "AI For School" },
            ]
        });

        console.log("Success");
        
    } catch (error) {
        console.log("Error seeding the database categories", error);
           
    }
    finally {
        await database.$disconnect();
    }
}

main();