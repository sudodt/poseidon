import { Entity } from '@loopback/repository';
import { ShoppingCartItem } from './shopping-cart-item.model';
export declare class Order extends Entity {
    orderId?: string;
    date?: string;
    userId: string;
    fullName: string;
    total?: number;
    products: ShoppingCartItem[];
    constructor(data?: Partial<Order>);
}
