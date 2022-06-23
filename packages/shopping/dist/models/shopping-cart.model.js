"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const shopping_cart_item_model_1 = require("./shopping-cart-item.model");
const user_model_1 = require("./user.model");
let ShoppingCart = class ShoppingCart extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], ShoppingCart.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.property.array(shopping_cart_item_model_1.ShoppingCartItem),
    tslib_1.__metadata("design:type", Array)
], ShoppingCart.prototype, "items", void 0);
ShoppingCart = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ShoppingCart);
exports.ShoppingCart = ShoppingCart;
//# sourceMappingURL=shopping-cart.model.js.map