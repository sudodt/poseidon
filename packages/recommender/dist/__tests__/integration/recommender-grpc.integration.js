"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const testlab_1 = require("@loopback/testlab");
const __1 = require("../..");
const recommendation_grpc_1 = require("../../recommendation-grpc");
const data = require('../../../data/recommendations.json');
describe('recommender', () => {
    let server;
    let port;
    before('starting server', async () => {
        const result = await (0, __1.createGRPCRecommendationServer)();
        server = result.server;
        port = result.port;
        server.start();
    });
    after('stopping server', async () => {
        if (server) {
            server.forceShutdown();
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let client;
    before(() => {
        const RecommendationService = (0, recommendation_grpc_1.loadRecommendationService)();
        client = new RecommendationService(`localhost:${port}`, grpc_js_1.credentials.createInsecure());
    });
    it('returns product recommendations for user002', done => {
        client.recommend({ userId: 'user002' }, (err, result) => {
            if (err)
                return done(err);
            (0, testlab_1.expect)(result).to.eql({ products: data['user002'] });
            done();
        });
    });
    it('returns product recommendations for other users', done => {
        client.recommend({ userId: 'user004' }, (err, result) => {
            if (err)
                return done(err);
            // Fallback to user001's list
            (0, testlab_1.expect)(result).to.eql({ products: data['user001'] });
            done();
        });
    });
});
//# sourceMappingURL=recommender-grpc.integration.js.map