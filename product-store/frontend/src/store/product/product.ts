// Core
import { create } from 'zustand';
// Types
import {
    Product,
    ProductStore
} from "@/store/product/product.types";

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products })
}));