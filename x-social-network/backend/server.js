// Core
import express from 'express';
// Routes
import authRoutes from '#routes/auth.routes.js';

const PORT = process.env.PORT || 4200;
const app = express();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});