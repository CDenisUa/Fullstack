export interface Product {
    name: string;
    price: string;
    image: string;
}

export interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: Product) => Promise<Response>;
}

type Response = {
    success: boolean,
    message: string
}