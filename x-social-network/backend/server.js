// Core
import express from 'express';
// DB
import connectToDatabase from '#root/db.js';
// Middlewares
import loadMiddlewares from '#src/middleware/index.js';
// Routes
import authRoutes from '#routes/auth.route.js';
import userRoutes from '#routes/user.route.js';
import postRoutes from '#routes/post.route.js';
import notificationRoutes from '#routes/notification.route.js';

const PORT = process.env.PORT || 4200;
const app = express();

loadMiddlewares(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectToDatabase();
});