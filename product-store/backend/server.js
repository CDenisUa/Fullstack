// Core
import express from 'express';
// DB
import './db.js';
// Routes
import productRoutes from './routes/product.routes.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});