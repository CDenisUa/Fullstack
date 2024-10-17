export interface Product {
    _id?: string;
    updatedAt?: string;
    createdAt?: string;
    name: string;
    price: string;
    image: string;
}

export interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: Product) => Promise<Response>;
    fetchProducts: () => void;
}

type Response = {
    success: boolean,
    message: string
}