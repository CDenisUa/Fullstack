// Core
import express from 'express';
// DB
import './db.js';
// Models
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Something went wrong',
            error: error.message
        })
    }
})

app.post('/api/products', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
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
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        })
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the product',
            error: error.message
        });
    }
});

app.listen(4200, () => {
    console.log('Server started at http://localhost:4200');
});