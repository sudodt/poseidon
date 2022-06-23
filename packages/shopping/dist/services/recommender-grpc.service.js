"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommenderGrpcServiceProvider = void 0;
const tslib_1 = require("tslib");
const service_proxy_1 = require("@loopback/service-proxy");
const core_1 = require("@loopback/core");
const datasources_1 = require("../datasources");
const recommender_service_1 = require("./recommender.service");
/**
 * gRPC based recommender service
 */
let RecommenderGrpcServiceProvider = class RecommenderGrpcServiceProvider {
    constructor(
    // recommender must match the name property in the datasource json file
    dataSource = new datasources_1.RecommenderGrpcDataSource()) {
        this.dataSource = dataSource;
    }
    async value() {
        const grpcService = await (0, service_proxy_1.getService)(this.dataSource);
        const service = {
            getProductRecommendations: async (userId) => {
                const res = await grpcService.recommend({ userId });
                return res.products;
            },
        };
        return service;
    }
};
RecommenderGrpcServiceProvider = tslib_1.__decorate([
    (0, core_1.bind)((0, recommender_service_1.recommender)('grpc')),
    tslib_1.__param(0, (0, core_1.inject)('datasources.recommender_grpc')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.RecommenderGrpcDataSource])
], RecommenderGrpcServiceProvider);
exports.RecommenderGrpcServiceProvider = RecommenderGrpcServiceProvider;
//# sourceMappingURL=recommender-grpc.service.js.map