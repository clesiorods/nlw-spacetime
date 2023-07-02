import 'dotenv/config';

import fastify from 'fastify';
import { memoriesRoutes } from './routes/memories';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth';

const app = fastify();

app.register(cors, {
    // origin: ['https://www.url-de-producao.com.br'] // apenas as URLs dentro do array poderão acessar esta aplicação
    origin: true // todas as URLs de front-end poderam acessar todas as rotas
});

app.register(jwt, {
    secret: 'spacetime'
});

app.register(memoriesRoutes);
app.register(authRoutes);

app.listen({
    port: 3333
}).then(() => {
    console.log('🚀 HTTP server running um http://localhost:3333');
})