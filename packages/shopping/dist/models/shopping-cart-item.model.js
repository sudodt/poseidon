"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
/**
 * Item in a shopping cart
 */
let ShoppingCartItem = class ShoppingCartItem extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({ id: true }),
    tslib_1.__metadata("design:type", String)
], ShoppingCartItem.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)(),
    tslib_1.__metadata("design:type", String)
], ShoppingCartItem.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)(),
    tslib_1.__metadata("design:type", Number)
], ShoppingCartItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, repository_1.property)(),
    tslib_1.__metadata("design:type", Number)
], ShoppingCartItem.prototype, "price", void 0);
ShoppingCartItem = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ShoppingCartItem);
exports.ShoppingCartItem = ShoppingCartItem;
//# sourceMappingURL=shopping-cart-item.model.js.map