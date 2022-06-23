"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommenderServiceProvider = exports.recommender = exports.RECOMMENDER_SERVICE = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
exports.RECOMMENDER_SERVICE = 'RecommenderService';
/**
 * A binding template for recommender service extensions
 */
function recommender(protocol) {
    const asRecommenderService = binding => {
        (0, core_1.extensionFor)(exports.RECOMMENDER_SERVICE)(binding);
        binding.tag({ protocol }).inScope(context_1.BindingScope.SINGLETON);
    };
    return asRecommenderService;
}
exports.recommender = recommender;
const recommenderFilter = binding => {
    var _a;
    const protocol = (_a = process.env.RECOMMENDER_PROTOCOL) !== null && _a !== void 0 ? _a : 'rest';
    return ((0, core_1.extensionFilter)(exports.RECOMMENDER_SERVICE)(binding) &&
        binding.tagMap.protocol === protocol);
};
/**
 * A facade recommender service that selects RESt or gRPC protocol based on
 * the value of `RECOMMENDER_PROTOCOL` environment variable
 */
let RecommenderServiceProvider = class RecommenderServiceProvider {
    constructor(recommenderServices) {
        this.recommenderServices = recommenderServices;
    }
    value() {
        return this.recommenderServices[0];
    }
};
RecommenderServiceProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(recommenderFilter)),
    tslib_1.__metadata("design:paramtypes", [Array])
], RecommenderServiceProvider);
exports.RecommenderServiceProvider = RecommenderServiceProvider;
//# sourceMappingURL=recommender.service.js.map