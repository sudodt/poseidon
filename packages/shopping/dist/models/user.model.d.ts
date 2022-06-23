import { Entity } from '@loopback/repository';
import { Order } from './order.model';
import { UserCredentials } from './user-credentials.model';
import { ShoppingCart } from './shopping-cart.model';
export declare class User extends Entity {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    orders: Order[];
    userCredentials: UserCredentials;
    shoppingCart: ShoppingCart;
    roles?: string[];
    resetKey?: string;
    resetCount: number;
    resetTimestamp: string;
    resetKeyTimestamp: string;
    constructor(data?: Partial<User>);
}
