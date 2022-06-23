"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcMain = exports.createGRPCRecommendationServer = exports.loadRecommendationService = exports.PROTO_PATH = void 0;
const tslib_1 = require("tslib");
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const path_1 = tslib_1.__importDefault(require("path"));
const recommendations = require('../data/recommendations.json');
exports.PROTO_PATH = path_1.default.join(__dirname, '../protos/recommendation.proto');
function loadRecommendationService() {
    const packageDefinition = (0, proto_loader_1.loadSync)(exports.PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const pkg = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
    const recommendation = pkg.recommendation
        .RecommendationService;
    return recommendation;
}
exports.loadRecommendationService = loadRecommendationService;
/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return The new server object
 */
function createGRPCRecommendationServer(port = '0.0.0.0:0') {
    const server = new grpc_js_1.Server();
    const recommendation = loadRecommendationService();
    const recommend = (call, callback) => {
        var _a, _b;
        let userId = (_b = (_a = call.request) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : 'user001';
        if (!(userId in recommendations)) {
            userId = 'user001';
        }
        callback(null, { products: recommendations[userId] || [] });
    };
    server.addService(recommendation.service, {
        recommend,
    });
    return new Promise((resolve, reject) => {
        server.bindAsync(port, grpc_js_1.ServerCredentials.createInsecure(), (err, p) => {
            if (err)
                reject(err);
            else
                return resolve({ server, port: p });
        });
    });
}
exports.createGRPCRecommendationServer = createGRPCRecommendationServer;
async function grpcMain(port = '0.0.0.0:0') {
    const recommendationServer = await createGRPCRecommendationServer(port);
    recommendationServer.server.start();
    console.log(`Recommendation gRPC server is running at ${port}.`);
    return recommendationServer;
}
exports.grpcMain = grpcMain;
if (require.main === module) {
    grpcMain().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
//# sourceMappingURL=recommendation-grpc.js.map