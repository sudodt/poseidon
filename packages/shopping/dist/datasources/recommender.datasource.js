"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommenderDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'recommender',
    connector: 'rest',
    crud: false,
    options: {
        headers: {
            accept: 'application/json',
            contentType: 'application/json',
        },
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: 'http://localhost:3001/{userId}',
            },
            functions: {
                getProductRecommendations: ['userId'],
            },
        },
    ],
};
function updateConfig(dsConfig) {
    var _a;
    if (process.env.KUBERNETES_SERVICE_HOST) {
        const host = (_a = process.env.RECOMMENDER_REST_SERVICE_HOST) !== null && _a !== void 0 ? _a : 'localhost';
        const port = +process.env.RECOMMENDER_REST_SERVICE_PORT_REST || 3001;
        dsConfig.operations[0].template.url = `http://${host}:${port}/{userId}`;
    }
    return dsConfig;
}
let RecommenderDataSource = class RecommenderDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(updateConfig(dsConfig));
    }
};
RecommenderDataSource.dataSourceName = config.name;
RecommenderDataSource.defaultConfig = config;
RecommenderDataSource = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.recommender', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], RecommenderDataSource);
exports.RecommenderDataSource = RecommenderDataSource;
//# sourceMappingURL=recommender.datasource.js.map