"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("@loopback/http-server"), exports);
tslib_1.__exportStar(require("./recommendation-grpc"), exports);
tslib_1.__exportStar(require("./recommendation-rest"), exports);
const recommendation_grpc_1 = require("./recommendation-grpc");
const recommendation_rest_1 = require("./recommendation-rest");
async function main(config = { rest: { port: 3001 }, grpc: {} }) {
    // Enable the protocol by env var `RECOMMENDER_PROTOCOL`
    // If not set, both protocols are enabled
    const protocol = process.env.RECOMMENDER_PROTOCOL;
    if (config.rest) {
        if (protocol == null || protocol === 'rest')
            await (0, recommendation_rest_1.restMain)(config.rest.port, config.rest.host);
    }
    if (config.grpc) {
        if (protocol == null || protocol === 'grpc') {
            (0, recommendation_grpc_1.grpcMain)(config.grpc.port).catch(err => {
                console.error(err);
                process.exit(1);
            });
        }
    }
}
exports.main = main;
if (require.main === module) {
    // Run the application
    main().catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map