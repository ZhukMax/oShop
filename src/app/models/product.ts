export interface Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}

export interface ProductId extends Product { id: string; }
