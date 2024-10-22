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
    deleteProduct: (id: string | undefined) => Promise<Response>;
    fetchProducts: () => void;
}

type Response = {
    success: boolean,
    message: string
}