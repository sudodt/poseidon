"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordInit = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ResetPasswordInit = class ResetPasswordInit extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordInit.prototype, "email", void 0);
ResetPasswordInit = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ResetPasswordInit);
exports.ResetPasswordInit = ResetPasswordInit;
//# sourceMappingURL=reset-password-init.model.js.map