// Core
import express from 'express';
// DB
import connectToDatabase from '#root/db.js';
// Routes
import authRoutes from '#routes/auth.routes.js';

const PORT = process.env.PORT || 4200;
const app = express();

connectToDatabase();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});