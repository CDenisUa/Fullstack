// Core
import express from 'express';
// Controllers
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/product.controller.js';

const router = express.Router();

// Products
router.get('/products', getProducts);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;
