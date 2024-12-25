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
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
