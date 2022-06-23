"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.restMain = exports.createRecommendationServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const recommendations = require('../data/recommendations.json');
const http_server_1 = require("@loopback/http-server");
function createRecommendationServer(port = 3001, host = undefined) {
    const app = (0, express_1.default)();
    app.get('/:userId', (req, res) => {
        let userId = req.params.userId || 'user001';
        if (!(userId in recommendations)) {
            userId = 'user001';
        }
        res.send(recommendations[userId] || []);
    });
    return new http_server_1.HttpServer(app, { port, host });
}
exports.createRecommendationServer = createRecommendationServer;
async function restMain(port = 3001, host = undefined) {
    const server = createRecommendationServer(port, host);
    await server.start();
    console.log('Recommendation REST server is running at ' + server.url + '.');
    return server;
}
exports.restMain = restMain;
//# sourceMappingURL=recommendation-rest.js.map