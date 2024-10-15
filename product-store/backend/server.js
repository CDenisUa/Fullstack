// Core
import express from 'express';
// DB
import './db.js';
// Routes
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(express.json());
app.use('/api', productRoutes);



app.listen(4200, () => {
    console.log('Server started at http://localhost:4200');
});