"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'mongo',
    connector: 'mongodb',
    url: '',
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: '',
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
function updateConfig(dsConfig) {
    if (process.env.KUBERNETES_SERVICE_HOST) {
        dsConfig.host = process.env.SHOPPING_APP_MONGODB_SERVICE_HOST;
        dsConfig.port = +process.env.SHOPPING_APP_MONGODB_SERVICE_PORT;
    }
    return dsConfig;
}
let MongoDataSource = class MongoDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(updateConfig(dsConfig));
    }
    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    stop() {
        return super.disconnect();
    }
};
MongoDataSource.dataSourceName = config.name;
MongoDataSource.defaultConfig = config;
MongoDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mongo', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongoDataSource);
exports.MongoDataSource = MongoDataSource;
//# sourceMappingURL=mongo.datasource.js.map