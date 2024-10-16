// Core
import express from 'express';
import cors from 'cors';
// DB
import './db.js';
// Routes
import productRoutes from './routes/product.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: true,
}))

// Routes
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});