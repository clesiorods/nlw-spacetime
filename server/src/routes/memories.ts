import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export async function memoriesRoutes(app: FastifyInstance) {

    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany();
        return memories;
    });
}