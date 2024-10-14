// Core
import express from 'express';
// DB
import './db.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Server is ready!")
})

app.listen(4200, () => {
    console.log('Server started at http://localhost:4200');
});