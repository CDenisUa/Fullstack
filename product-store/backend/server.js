// Core
import express from 'express';
import cors from 'cors';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// DB
import './db.js';
// API Routes
import productRoutes from './routes/product.routes.js';

const dev = process.env.NODE_ENV !== 'production';
const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
server.use(express.json());
server.use(cors({
    origin: true,
}));

// API Routes
server.use('/api/products', productRoutes);

if (!dev) {
    server.use(express.static(path.join(__dirname, '../frontend/.next')));

    import('next').then(next => {
        const app = next.default({ dev, dir: path.join(__dirname, '../frontend') });
        const handle = app.getRequestHandler();

        app.prepare().then(() => {
            server.all('*', (req, res) => {
                return handle(req, res);
            });

            server.listen(process.env.PORT || 3000, (err) => {
                if (err) throw err;
                console.log(`> Server started at http://localhost:${process.env.PORT || 3000}`);
            });
        });
    });
} else {
    server.listen(process.env.PORT || 3000, (err) => {
        if (err) throw err;
        console.log(`> API server started at http://localhost:${process.env.PORT || 3000}`);
    });
}
