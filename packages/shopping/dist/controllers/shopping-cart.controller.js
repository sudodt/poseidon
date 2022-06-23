"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const security_1 = require("@loopback/security");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const services_1 = require("../services");
const debug_1 = tslib_1.__importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = (0, debug_1.default)('loopback:example:shopping');
/**
 * Controller for shopping cart
 */
let ShoppingCartController = class ShoppingCartController {
    constructor(currentUserProfile, shoppingCartRepository) {
        this.currentUserProfile = currentUserProfile;
        this.shoppingCartRepository = shoppingCartRepository;
    }
    /**
     * Create the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart
     */
    async create(userId, cart) {
        debug('Create shopping cart %s: %j', userId, cart);
        await this.shoppingCartRepository.set(userId, cart);
    }
    /**
     * Create or update the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart
     */
    async set(userId, cart) {
        debug('Create shopping cart %s: %j', userId, cart);
        await this.shoppingCartRepository.set(userId, cart);
    }
    /**
     * Retrieve the shopping cart by user id
     * @param userId User id
     */
    async get(userId) {
        debug('Get shopping cart %s', userId);
        const cart = await this.shoppingCartRepository.get(userId);
        debug('Shopping cart %s: %j', userId, cart);
        if (cart == null) {
            throw new rest_1.HttpErrors.NotFound(`Shopping cart not found for user: ${userId}`);
        }
        else {
            return cart;
        }
    }
    /**
     * Delete the shopping cart by user id
     * @param userId User id
     */
    async remove(userId) {
        debug('Remove shopping cart %s', userId);
        await this.shoppingCartRepository.delete(userId);
    }
    /**
     * Add an item to the shopping cart for a given user
     * @param userId User id
     * @param cart Shopping cart item to be added
     */
    async addItem(userId, item) {
        debug('Add item %j to shopping cart %s', item, userId);
        return this.shoppingCartRepository.addItem(userId, item);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/shoppingCarts/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '204': {
                description: 'User shopping cart is created or updated',
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({ description: 'shopping cart' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ShoppingCart]),
    tslib_1.__metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.put)('/shoppingCarts/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '204': {
                description: 'User shopping cart is created or updated',
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({ description: 'shopping cart' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ShoppingCart]),
    tslib_1.__metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "set", null);
tslib_1.__decorate([
    (0, rest_1.get)('/shoppingCarts/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User shopping cart is read',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.ShoppingCart } } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.del)('/shoppingCarts/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '204': {
                description: 'User shopping cart is deleted',
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "remove", null);
tslib_1.__decorate([
    (0, rest_1.post)('/shoppingCarts/{userId}/items', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User shopping cart item is created',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.ShoppingCart } },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({ description: 'shopping cart item' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ShoppingCartItem]),
    tslib_1.__metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "addItem", null);
ShoppingCartController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ShoppingCartRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, repositories_1.ShoppingCartRepository])
], ShoppingCartController);
exports.ShoppingCartController = ShoppingCartController;
//# sourceMappingURL=shopping-cart.controller.js.map