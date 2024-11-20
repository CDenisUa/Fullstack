// Core
import express from 'express';
// DB
import connectToDatabase from '#root/db.js';
// Middlewares
import loadMiddleware from '#src/middleware/index.js';
// Routes
import authRoutes from '#routes/auth.routes.js';
import userRoutes from '#routes/user.routes.js';

const PORT = process.env.PORT || 4200;
const app = express();

loadMiddleware(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectToDatabase();
});