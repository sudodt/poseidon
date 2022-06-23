"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommenderGrpcDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const path_1 = tslib_1.__importDefault(require("path"));
const config = {
    name: 'recommender_grpc',
    connector: 'loopback-connector-grpc',
    url: '127.0.0.1:50000',
    spec: 'protos/recommendation.proto',
};
function updateConfig(dsConfig) {
    if (process.env.KUBERNETES_SERVICE_HOST &&
        process.env.RECOMMENDER_GRPC_SERVICE_HOST) {
        const host = process.env.RECOMMENDER_GRPC_SERVICE_HOST;
        const port = +process.env.RECOMMENDER_GRPC_SERVICE_PORT_GRPC;
        dsConfig.url = `${host}:${port}`;
    }
    return dsConfig;
}
let RecommenderGrpcDataSource = class RecommenderGrpcDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super({
            ...updateConfig(dsConfig),
            spec: RecommenderGrpcDataSource.getProtoFile(),
        });
    }
    static getProtoFile() {
        return path_1.default.resolve(__dirname, '../../protos/recommendation.proto');
    }
};
RecommenderGrpcDataSource.dataSourceName = config.name;
RecommenderGrpcDataSource.defaultConfig = config;
RecommenderGrpcDataSource = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.recommender_grpc', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], RecommenderGrpcDataSource);
exports.RecommenderGrpcDataSource = RecommenderGrpcDataSource;
//# sourceMappingURL=recommender-grpc.datasource.js.map