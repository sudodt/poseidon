import { UserProfile } from '@loopback/security';
import { ShoppingCartRepository } from '../repositories';
import { ShoppingCart, ShoppingCartItem } from '../models';
/**
 * Controller for shopping cart
 */
export declare class ShoppingCartController {
    currentUserProfile: UserProfile;
    shoppingCartRepository: ShoppingCartRepository;
    constructor(currentUserProfile: UserProfile, shoppingCartRepository: ShoppingCartRepository);
    /**
     * Create the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart
     */
    create(userId: string, cart: ShoppingCart): Promise<void>;
    /**
     * Create or update the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart
     */
    set(userId: string, cart: ShoppingCart): Promise<void>;
    /**
     * Retrieve the shopping cart by user id
     * @param userId User id
     */
    get(userId: string): Promise<ShoppingCart>;
    /**
     * Delete the shopping cart by user id
     * @param userId User id
     */
    remove(userId: string): Promise<void>;
    /**
     * Add an item to the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart item to be added
     */
    addItem(userId: string, item: ShoppingCartItem): Promise<ShoppingCart>;
}
