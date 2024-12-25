// Core
import { create } from 'zustand';
// Types
import {
    Product,
    ProductStore
} from "@/store/product/product.types";

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
    createProduct: async (newProduct: Product) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false,
                message: 'Please fill in all fields.'
            }
        }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST_NAME}/api/products`,
            {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(newProduct)
            }
        )

        const data = await res.json();

        set(state => ({
            products: [...state.products, data.data],
        }))
        return {
            success: true,
            message: `Product created successfully.`,
        }
    },
    fetchProducts: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/api/products`);
        const data = await res.json();
        set({products: data.data});
    },
    deleteProduct: async (id: string | undefined) => {
        if(!id) return {
            success: false,
            message: 'ID is required'
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/api/products/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if(!data.success) {
           return {
               success: false,
               message: data.message,
           }
        }

        set(state => ({
            products: state.products.filter(product => product['_id'] !== id)
        }));
        return {
            success: true,
            message: data.message,
        }
    },
    updateProduct: async (id: string | undefined, updatedProduct: Product) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();

        if(!data.success) {
            return {
                success: false,
                message: data.message,
            }
        }

        set(state => ({
            products: state.products.map(product => product['_id'] === id ? data.data : product)
        }))

        return {
            success: true,
            message: data.message,
        }
    }
}));