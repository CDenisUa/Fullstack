// Core
import express from 'express';
// DB
import connectToDatabase from '#root/db.js';
// Middlewares
import loadMiddlewares from '#src/middleware/index.js';
// Routes
import authRoutes from '#routes/auth.routes.js';
import userRoutes from '#routes/user.routes.js';
import postRoutes from '#routes/post.routes.js';

const PORT = process.env.PORT || 4200;
const app = express();

loadMiddlewares(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectToDatabase();
});