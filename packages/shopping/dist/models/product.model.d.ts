import { Entity } from '@loopback/repository';
export declare class Product extends Entity {
    productId?: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    details?: string;
    constructor(data?: Partial<Product>);
}
export interface ProductRelations {
}
export declare type ProductWithRelations = Product & ProductRelations;
