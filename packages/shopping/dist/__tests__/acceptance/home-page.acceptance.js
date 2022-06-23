"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const helper_1 = require("./helper");
describe('HomePageController', () => {
    let app;
    let client;
    before('setupApplication', async () => {
        ({ app, client } = await (0, helper_1.setupApplication)());
    });
    after(async () => {
        await app.stop();
    });
    it('exposes a default home page', async () => {
        const res = await client
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/);
        (0, testlab_1.expect)(res.body).to.match(/@loopback\/example\-shopping/);
    });
    it('exposes /openapi.json', async () => {
        const res = await client
            .get('/openapi.json')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        (0, testlab_1.expect)(res.body).to.containEql({
            openapi: '3.0.0',
        });
    });
});
//# sourceMappingURL=home-page.acceptance.js.map