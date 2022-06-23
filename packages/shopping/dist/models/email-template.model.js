"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplate = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let EmailTemplate = class EmailTemplate extends repository_1.Model {
    constructor(data) {
        super(data);
        this.from = 'no_reply@loopback.io';
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Object)
], EmailTemplate.prototype, "from", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], EmailTemplate.prototype, "to", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], EmailTemplate.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], EmailTemplate.prototype, "text", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], EmailTemplate.prototype, "html", void 0);
EmailTemplate = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], EmailTemplate);
exports.EmailTemplate = EmailTemplate;
//# sourceMappingURL=email-template.model.js.map