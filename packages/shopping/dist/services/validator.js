"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKeyPassword = exports.validateCredentials = void 0;
const tslib_1 = require("tslib");
const isemail_1 = tslib_1.__importDefault(require("isemail"));
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    if (!isemail_1.default.validate(credentials.email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid email');
    }
    // Validate Password Length
    if (!credentials.password || credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
function validateKeyPassword(keyAndPassword) {
    // Validate Password Length
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password and confirmation password do not match');
    }
    if (keyAndPassword.resetKey.length === 0 ||
        keyAndPassword.resetKey.trim() === '') {
        throw new rest_1.HttpErrors.UnprocessableEntity('reset key is mandatory');
    }
}
exports.validateKeyPassword = validateKeyPassword;
//# sourceMappingURL=validator.js.map