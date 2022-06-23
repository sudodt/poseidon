"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const __1 = require("../..");
const data = require('../../../data/recommendations.json');
describe('recommender', () => {
    let server;
    before('starting server', async () => {
        const config = (0, testlab_1.givenHttpServerConfig)();
        server = (0, __1.createRecommendationServer)(config.port, config.host);
        await server.start();
    });
    after('stopping server', async () => {
        if (server) {
            await server.stop();
        }
    });
    it('returns product recommendations', async () => {
        const client = (0, testlab_1.createRestAppClient)({
            restServer: server,
        });
        await client.get('/user002').expect(200, data['user002']);
    });
});
//# sourceMappingURL=recommender-rest.integration.js.map