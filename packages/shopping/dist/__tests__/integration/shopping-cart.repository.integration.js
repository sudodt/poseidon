"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const testlab_1 = require("@loopback/testlab");
const datasources_1 = require("../../datasources");
describe('ShoppingCart KeyValue Repository', () => {
    let repo;
    let cart1;
    let cart2;
    let redis;
    before(() => {
        cart1 = givenShoppingCart1();
        cart2 = givenShoppingCart2();
        redis = new datasources_1.RedisDataSource(datasources_1.RedisDataSource.defaultConfig);
        repo = new repositories_1.ShoppingCartRepository(redis);
    });
    after(async () => {
        await redis.stop();
    });
    beforeEach(async () => {
        await repo.set(cart1.userId, cart1);
        await repo.set(cart2.userId, cart2);
    });
    afterEach(async () => {
        await repo.deleteAll();
    });
    it('gets data by key', async () => {
        let result = await repo.get(cart1.userId);
        (0, testlab_1.expect)(result.toJSON()).to.eql(cart1.toJSON());
        result = await repo.get(cart2.userId);
        (0, testlab_1.expect)(result.toJSON()).to.eql(cart2.toJSON());
    });
    it('list keys', async () => {
        const keys = [];
        for await (const k of repo.keys()) {
            keys.push(k);
        }
        (0, testlab_1.expect)(keys).to.containEql(cart1.userId);
        (0, testlab_1.expect)(keys).to.containEql(cart2.userId);
    });
    it('deletes a key', async () => {
        await repo.delete(cart1.userId);
        const result = await repo.get(cart1.userId);
        (0, testlab_1.expect)(result).to.be.null();
    });
    it('adds an item', async () => {
        const item = new models_1.ShoppingCartItem({
            productId: 'p3',
            quantity: 10,
            price: 200,
        });
        await repo.addItem(cart1.userId, item);
        const result = await repo.get(cart1.userId);
        (0, testlab_1.expect)(result.items).to.containEql(item.toJSON());
    });
});
function givenShoppingCart1() {
    return new models_1.ShoppingCart({
        userId: 'u01',
        items: [
            new models_1.ShoppingCartItem({
                productId: 'p1',
                quantity: 10,
                price: 100,
            }),
        ],
    });
}
function givenShoppingCart2() {
    return new models_1.ShoppingCart({
        userId: 'u02',
        items: [
            new models_1.ShoppingCartItem({
                productId: 'p1',
                quantity: 1,
                price: 10,
            }),
            new models_1.ShoppingCartItem({
                productId: 'p2',
                quantity: 5,
                price: 20,
            }),
        ],
    });
}
//# sourceMappingURL=shopping-cart.repository.integration.js.map