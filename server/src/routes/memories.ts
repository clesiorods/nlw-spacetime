import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod';


export async function memoriesRoutes(app: FastifyInstance) {

    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return memories.map((memory) => {
            return ({
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: (memory.content.length > 115) ? (memory.content.substring(0, 115).concat('...')) : (memory.content),
            });
        });
    });


    app.get('/memories/:id', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(req.params);
        const memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

        return memory
    });


    app.post('/memories', async (req) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });

        const { content, coverUrl, isPublic } = bodySchema.parse(req.body);
        const memory = await prisma.memory.create({
            data: {
                content, 
                coverUrl,
                isPublic,
                userId: 'd0f9ba3e-6e2b-4f2d-b472-04b804abff50'
            }
        });
        return memory;
    });


    app.put('/memories/:id', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });
        
        const { id } = paramsSchema.parse(req.params);
        const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

        const memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content, 
                coverUrl,
                isPublic,
                userId: 'd0f9ba3e-6e2b-4f2d-b472-04b804abff50'
            }
        });
        return memory;
    });


    app.delete('/memories/:id', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(req.params);
        const memory = await prisma.memory.delete({ where: { id } });
    });
}