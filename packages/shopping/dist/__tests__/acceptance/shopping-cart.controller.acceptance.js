"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const models_1 = require("../../models");
const helper_1 = require("./helper");
describe('ShoppingCartController', () => {
    let app;
    let client;
    let cartRepo;
    let userManagementService;
    const userData = {
        email: '',
        firstName: 'John',
        roles: ['customer'],
    };
    const userPassword = 'p4ssw0rd';
    before('setupApplication', async () => {
        ({ app, client } = await (0, helper_1.setupApplication)());
        cartRepo = await app.get('repositories.ShoppingCartRepository');
        userManagementService = await app.get('services.user.service');
    });
    after(async () => {
        await app.stop();
    });
    beforeEach(clearDatabase);
    it('protects shopping cart with authorization', async () => {
        const cart = givenShoppingCart();
        await client
            .post(`/shoppingCarts/${cart.userId}`)
            .set('Content-Type', 'application/json')
            .send(cart)
            .expect(401);
    });
    it('sets a shopping cart for a user', async () => {
        userData.email = 'userA@loopback.io';
        const user = await givenAUser();
        const token = await authenticateUser(user);
        const cart = givenShoppingCart(user.id);
        await client
            .post(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(cart)
            .expect(204);
    });
    it('throws error if userId does not match the cart', async () => {
        userData.email = 'userB@loopback.io';
        const user = await givenAUser();
        const token = await authenticateUser(user);
        const cart = givenShoppingCart(user.id);
        await client
            .post('/shoppingCarts/non-existant-id')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(cart)
            .expect(403);
    });
    it('returns a shopping cart', async () => {
        userData.email = 'userC@loopback.io';
        const user = await givenAUser();
        const token = await authenticateUser(user);
        const cart = givenShoppingCart(user.id);
        await client
            .get(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(404);
        await client
            .post(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .send(cart)
            .expect(204);
        await client
            .get(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, cart.toJSON());
    });
    it('deletes a shopping cart', async () => {
        userData.email = 'userD@loopback.io';
        const user = await givenAUser();
        const token = await authenticateUser(user);
        const cart = givenShoppingCart(user.id);
        // Set the shopping cart
        await client
            .post(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .send(cart)
            .expect(204);
        // Now we can see it
        await client
            .get(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, cart.toJSON());
        // Delete the shopping cart
        await client
            .del(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(204);
        // Now it's gone
        await client
            .get(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(404);
    });
    it('adds a shopping cart item', async () => {
        userData.email = 'userE@loopback.io';
        const user = await givenAUser();
        const token = await authenticateUser(user);
        const cart = givenShoppingCart(user.id);
        const newItem = givenAnItem();
        // Set the shopping cart
        await client
            .post(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .send(cart)
            .expect(204);
        // Now we can see it
        await client
            .post(`/shoppingCarts/${cart.userId}/items`)
            .set('Authorization', 'Bearer ' + token)
            .send(newItem)
            .expect(200);
        const newCart = (await client
            .get(`/shoppingCarts/${cart.userId}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)).body;
        (0, testlab_1.expect)(newCart.items).to.containEql(newItem.toJSON());
    });
    async function clearDatabase() {
        await cartRepo.deleteAll();
    }
    function givenAnItem(item) {
        return new models_1.ShoppingCartItem(Object.assign({
            productId: '0',
            name: 'iPhone XS',
            quantity: 2,
            price: 2000,
        }, item));
    }
    function givenShoppingCart(userId = '0') {
        return new models_1.ShoppingCart({
            userId: userId,
            items: [givenAnItem()],
        });
    }
    async function givenAUser() {
        const userWithPassword = new models_1.UserWithPassword(userData);
        userWithPassword.password = userPassword;
        return userManagementService.createUser(userWithPassword);
    }
    async function authenticateUser(user) {
        const res = await client
            .post('/users/login')
            .send({ email: user.email, password: userPassword });
        return res.body.token;
    }
});
//# sourceMappingURL=shopping-cart.controller.acceptance.js.map