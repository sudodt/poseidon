"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementService = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const keys_1 = require("../keys");
const repositories_1 = require("../repositories");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const email_service_1 = require("./email.service");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
let UserManagementService = class UserManagementService {
    constructor(userRepository, passwordHasher, emailService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.emailService = emailService;
    }
    async verifyCredentials(credentials) {
        const { email, password } = credentials;
        const invalidCredentialsError = 'Invalid email or password.';
        if (!email) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const foundUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const credentialsFound = await this.userRepository.findCredentials(foundUser.id);
        if (!credentialsFound) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await this.passwordHasher.comparePassword(password, credentialsFound.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    convertToUserProfile(user) {
        // since first name and lastName are optional, no error is thrown if not provided
        let userName = '';
        if (user.firstName)
            userName = `${user.firstName}`;
        if (user.lastName)
            userName = user.firstName
                ? `${userName} ${user.lastName}`
                : `${user.lastName}`;
        return {
            [security_1.securityId]: user.id,
            name: userName,
            id: user.id,
            roles: user.roles,
        };
    }
    async createUser(userWithPassword) {
        const password = await this.passwordHasher.hashPassword(userWithPassword.password);
        userWithPassword.password = password;
        const user = await this.userRepository.create(lodash_1.default.omit(userWithPassword, 'password'));
        user.id = user.id.toString();
        await this.userRepository.userCredentials(user.id).create({ password });
        return user;
    }
    async requestPasswordReset(email) {
        const noAccountFoundError = 'No account associated with the provided email address.';
        const foundUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound(noAccountFoundError);
        }
        const user = await this.updateResetRequestLimit(foundUser);
        try {
            await this.userRepository.updateById(user.id, user);
        }
        catch (e) {
            return e;
        }
        return this.emailService.sendResetPasswordMail(user);
    }
    /**
     * Checks user reset timestamp if its same day increase count
     * otherwise set current date as timestamp and start counting
     * For first time reset request set reset count to 1 and assign same day timestamp
     * @param user
     */
    async updateResetRequestLimit(user) {
        var _a;
        const resetTimestampDate = new Date(user.resetTimestamp);
        const difference = await (0, utils_1.subtractDates)(resetTimestampDate);
        if (difference === 0) {
            user.resetCount = user.resetCount + 1;
            if (user.resetCount > +((_a = process.env.PASSWORD_RESET_EMAIL_LIMIT) !== null && _a !== void 0 ? _a : 2)) {
                throw new rest_1.HttpErrors.TooManyRequests('Account has reached daily limit for sending password-reset requests');
            }
        }
        else {
            user.resetTimestamp = new Date().toLocaleDateString();
            user.resetCount = 1;
        }
        // For generating unique reset key there are other options besides the proposed solution below.
        // Feel free to use whatever option works best for your needs
        user.resetKey = (0, uuid_1.v4)();
        user.resetKeyTimestamp = new Date().toLocaleDateString();
        return user;
    }
    /**
     * Ensures reset key is only valid for a day
     * @param user
     */
    async validateResetKeyLifeSpan(user) {
        const resetKeyLifeSpan = new Date(user.resetKeyTimestamp);
        const difference = await (0, utils_1.subtractDates)(resetKeyLifeSpan);
        user.resetKey = '';
        user.resetKeyTimestamp = '';
        if (difference !== 0) {
            throw new rest_1.HttpErrors.BadRequest('The provided reset key has expired.');
        }
        return user;
    }
};
UserManagementService = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, context_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(2, (0, context_1.inject)('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, Object, email_service_1.EmailService])
], UserManagementService);
exports.UserManagementService = UserManagementService;
//# sourceMappingURL=user-management.service.js.map