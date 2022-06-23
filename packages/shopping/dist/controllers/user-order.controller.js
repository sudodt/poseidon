"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrderController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const utils_1 = require("../utils");
/**
 * Controller for User's Orders
 */
let UserOrderController = class UserOrderController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    /**
     * Create or update the orders for a given user
     * @param userId User id
     * @param cart Shopping cart
     */
    async createOrder(userId, order) {
        order.date = new Date().toString();
        return this.userRepo
            .orders(userId)
            .create(order)
            .catch(e => {
            throw (0, rest_1.HttpErrors)(400);
        });
    }
    async findOrders(userId, filter) {
        const orders = await this.userRepo.orders(userId).find(filter);
        return orders;
    }
    async patchOrders(userId, order, where) {
        return this.userRepo.orders(userId).patch(order, where);
    }
    async deleteOrders(userId, where) {
        return this.userRepo.orders(userId).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/users/{userId}/orders', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User.Order model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Order } } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Order]),
    tslib_1.__metadata("design:returntype", Promise)
], UserOrderController.prototype, "createOrder", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/{userId}/orders', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: "Array of User's Orders",
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Order } },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Order))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserOrderController.prototype, "findOrders", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users/{userId}/orders', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User.Order PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Order))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserOrderController.prototype, "patchOrders", null);
tslib_1.__decorate([
    (0, rest_1.del)('/users/{userId}/orders', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User.Order DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({ allowedRoles: ['customer'], voters: [services_1.basicAuthorization] }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Order))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserOrderController.prototype, "deleteOrders", null);
UserOrderController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserOrderController);
exports.UserOrderController = UserOrderController;
//# sourceMappingURL=user-order.controller.js.map