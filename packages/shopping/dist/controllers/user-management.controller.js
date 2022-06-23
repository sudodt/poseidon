"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementController = exports.NewUserRequest = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const utils_1 = require("../utils");
const user_controller_specs_1 = require("./specs/user-controller.specs");
const isemail_1 = tslib_1.__importDefault(require("isemail"));
let NewUserRequest = class NewUserRequest extends models_1.User {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "password", void 0);
NewUserRequest = tslib_1.__decorate([
    (0, repository_1.model)()
], NewUserRequest);
exports.NewUserRequest = NewUserRequest;
let UserManagementController = class UserManagementController {
    constructor(userRepository, recommender, passwordHasher, jwtService, userService, userManagementService) {
        this.userRepository = userRepository;
        this.recommender = recommender;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userManagementService = userManagementService;
    }
    async create(newUserRequest) {
        // All new users have the "customer" role by default
        newUserRequest.roles = ['customer'];
        // ensure a valid email value and password value
        (0, services_1.validateCredentials)(lodash_1.default.pick(newUserRequest, ['email', 'password']));
        try {
            newUserRequest.resetKey = '';
            return await this.userManagementService.createUser(newUserRequest);
        }
        catch (error) {
            // MongoError 11000 duplicate key
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new rest_1.HttpErrors.Conflict('Email value is already taken');
            }
            else {
                throw error;
            }
        }
    }
    async set(currentUserProfile, userId, user) {
        try {
            // Only admin can assign roles
            if (!currentUserProfile.roles.includes('admin')) {
                delete user.roles;
            }
            return await this.userRepository.updateById(userId, user);
        }
        catch (e) {
            return e;
        }
    }
    async findById(userId) {
        return this.userRepository.findById(userId);
    }
    async printCurrentUser(currentUserProfile) {
        // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
        // for symbol property
        const userId = currentUserProfile[security_1.securityId];
        return this.userRepository.findById(userId);
    }
    async productRecommendations(userId) {
        return this.recommender.getProductRecommendations(userId);
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async forgotPassword(currentUserProfile, credentials) {
        const { email, password } = credentials;
        const { id } = currentUserProfile;
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('User account not found');
        }
        if (email !== (user === null || user === void 0 ? void 0 : user.email)) {
            throw new rest_1.HttpErrors.Forbidden('Invalid email address');
        }
        (0, services_1.validateCredentials)(lodash_1.default.pick(credentials, ['email', 'password']));
        const passwordHash = await this.passwordHasher.hashPassword(password);
        await this.userRepository
            .userCredentials(user.id)
            .patch({ password: passwordHash });
        const userProfile = this.userService.convertToUserProfile(user);
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async resetPasswordInit(resetPasswordInit) {
        if (!isemail_1.default.validate(resetPasswordInit.email)) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Invalid email address');
        }
        const sentMessageInfo = await this.userManagementService.requestPasswordReset(resetPasswordInit.email);
        if (sentMessageInfo.accepted.length) {
            return 'Successfully sent reset password link';
        }
        throw new rest_1.HttpErrors.InternalServerError('Error sending reset password email');
    }
    async resetPasswordFinish(keyAndPassword) {
        (0, services_1.validateKeyPassword)(keyAndPassword);
        const foundUser = await this.userRepository.findOne({
            where: { resetKey: keyAndPassword.resetKey },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound('No associated account for the provided reset key');
        }
        const user = await this.userManagementService.validateResetKeyLifeSpan(foundUser);
        const passwordHash = await this.passwordHasher.hashPassword(keyAndPassword.password);
        try {
            await this.userRepository
                .userCredentials(user.id)
                .patch({ password: passwordHash });
            await this.userRepository.updateById(user.id, user);
        }
        catch (e) {
            return e;
        }
        return 'Password reset successful';
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/users', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(NewUserRequest, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.put)('/users/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: ['admin', 'customer'],
        voters: [services_1.basicAuthorization],
    }),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__param(1, rest_1.param.path.string('userId')),
    tslib_1.__param(2, (0, rest_1.requestBody)({ description: 'update user' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "set", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/{userId}', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: ['admin', 'support', 'customer'],
        voters: [services_1.basicAuthorization],
    }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/me', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: user_controller_specs_1.UserProfileSchema,
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "printCurrentUser", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/{userId}/recommend', {
        responses: {
            '200': {
                description: 'Products',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                'x-ts-type': models_1.Product,
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "productRecommendations", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(user_controller_specs_1.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "login", null);
tslib_1.__decorate([
    (0, rest_1.put)('/users/forgot-password', {
        security: utils_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'The updated user profile',
                content: {
                    'application/json': {
                        schema: user_controller_specs_1.UserProfileSchema,
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__param(1, (0, rest_1.requestBody)(user_controller_specs_1.PasswordResetRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/reset-password/init', {
        responses: {
            '200': {
                description: 'Confirmation that reset password email has been sent',
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ResetPasswordInit]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "resetPasswordInit", null);
tslib_1.__decorate([
    (0, rest_1.put)('/users/reset-password/finish', {
        responses: {
            '200': {
                description: 'A successful password reset response',
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.KeyAndPassword]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "resetPasswordFinish", null);
UserManagementController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.inject)('services.RecommenderService')),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(3, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(4, (0, core_1.inject)(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(5, (0, core_1.inject)(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, Object, Object, Object, Object, services_1.UserManagementService])
], UserManagementController);
exports.UserManagementController = UserManagementController;
//# sourceMappingURL=user-management.controller.js.map