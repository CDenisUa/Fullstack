// Core
import express from 'express';
// DB
import './db.js';
// Models
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());
app.post('api/products', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.images) {
        return res.status(400).send({
            success: false,
            message: 'Please provide all fields.'
        })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error('Error creating product', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
});

app.listen(4200, () => {
    console.log('Server started at http://localhost:4200');
});