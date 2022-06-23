"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommenderRestServiceProvider = void 0;
const tslib_1 = require("tslib");
const service_proxy_1 = require("@loopback/service-proxy");
const core_1 = require("@loopback/core");
const recommender_datasource_1 = require("../datasources/recommender.datasource");
const recommender_service_1 = require("./recommender.service");
/**
 * Rest based recommender service
 */
let RecommenderRestServiceProvider = class RecommenderRestServiceProvider {
    constructor(datasource) {
        this.datasource = datasource;
    }
    value() {
        return (0, service_proxy_1.getService)(this.datasource);
    }
};
RecommenderRestServiceProvider = tslib_1.__decorate([
    (0, core_1.bind)((0, recommender_service_1.recommender)('rest')),
    tslib_1.__param(0, (0, core_1.inject)('datasources.recommender')),
    tslib_1.__metadata("design:paramtypes", [recommender_datasource_1.RecommenderDataSource])
], RecommenderRestServiceProvider);
exports.RecommenderRestServiceProvider = RecommenderRestServiceProvider;
//# sourceMappingURL=recommender-rest.service.js.map