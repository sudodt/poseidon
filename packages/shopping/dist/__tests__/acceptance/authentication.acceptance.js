"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const testlab_1 = require("@loopback/testlab");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const keys_1 = require("../../keys");
const models_1 = require("../../models");
const services_1 = require("../../services");
const helper_1 = require("./helper");
describe('authentication services', function () {
    this.timeout(5000);
    let app;
    const userData = {
        email: 'unittest@loopback.io',
        firstName: 'unit',
        lastName: 'test',
        roles: ['customer'],
    };
    const userPassword = 'p4ssw0rd';
    let user;
    let jwtService;
    let userService;
    let bcryptHasher;
    let userManagementService;
    before(setupApp);
    after(async () => {
        if (app != null)
            await app.stop();
    });
    let userRepo;
    before(async () => {
        userRepo = await app.get('repositories.UserRepository');
        userManagementService = await app.get('services.user.service');
    });
    before(clearDatabase);
    before(createUser);
    before(createTokenService);
    before(createUserService);
    it('validateCredentials() succeeds', () => {
        const credentials = { email: 'dom@example.com', password: 'p4ssw0rd' };
        (0, testlab_1.expect)(() => (0, services_1.validateCredentials)(credentials)).to.not.throw();
    });
    it('validateCredentials() fails with invalid email', () => {
        const expectedError = new rest_1.HttpErrors.UnprocessableEntity('invalid email');
        const credentials = { email: 'domdomdom', password: 'p4ssw0rd' };
        (0, testlab_1.expect)(() => (0, services_1.validateCredentials)(credentials)).to.throw(expectedError);
    });
    it('validateCredentials() fails with invalid password', () => {
        const expectedError = new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
        const credentials = { email: 'dom@example.com', password: 'p4ss' };
        (0, testlab_1.expect)(() => (0, services_1.validateCredentials)(credentials)).to.throw(expectedError);
    });
    it('user service verifyCredentials() succeeds', async () => {
        const { email } = user;
        const credentials = { email, password: userPassword };
        const returnedUser = await userService.verifyCredentials(credentials);
        // create a copy of returned user without password field
        const returnedUserWithOutPassword = lodash_1.default.omit(returnedUser, 'password');
        // create a copy of expected user without password field
        const expectedUserWithoutPassword = lodash_1.default.omit(user, 'password');
        (0, testlab_1.expect)(returnedUserWithOutPassword).to.deepEqual(expectedUserWithoutPassword);
    });
    it('user service verifyCredentials() fails with user not found', async () => {
        const credentials = { email: 'idontexist@example.com', password: 'p4ssw0rd' };
        const expectedError = new rest_1.HttpErrors.Unauthorized('Invalid email or password.');
        await (0, testlab_1.expect)(userService.verifyCredentials(credentials)).to.be.rejectedWith(expectedError);
    });
    it('user service verifyCredentials() fails with incorrect credentials', async () => {
        const { email } = user;
        const credentials = { email, password: 'invalidp4ssw0rd' };
        const expectedError = new rest_1.HttpErrors.Unauthorized('Invalid email or password.');
        await (0, testlab_1.expect)(userService.verifyCredentials(credentials)).to.be.rejectedWith(expectedError);
    });
    it('user service convertToUserProfile() succeeds', () => {
        const expectedUserProfile = {
            [security_1.securityId]: user.id,
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            roles: ['customer'],
        };
        const userProfile = userService.convertToUserProfile(user);
        (0, testlab_1.expect)(userProfile).to.deepEqual(expectedUserProfile);
    });
    it('user service convertToUserProfile() succeeds without optional fields : firstName, lastName', () => {
        const userWithoutFirstOrLastName = Object.assign({}, user);
        delete userWithoutFirstOrLastName.firstName;
        delete userWithoutFirstOrLastName.lastName;
        const userProfile = userService.convertToUserProfile(userWithoutFirstOrLastName);
        (0, testlab_1.expect)(userProfile[security_1.securityId]).to.equal(user.id);
        (0, testlab_1.expect)(userProfile.name).to.equal('');
    });
    it('user service convertToUserProfile() succeeds without optional field : lastName', () => {
        const userWithoutLastName = Object.assign({}, user);
        delete userWithoutLastName.lastName;
        const userProfile = userService.convertToUserProfile(userWithoutLastName);
        (0, testlab_1.expect)(userProfile[security_1.securityId]).to.equal(user.id);
        (0, testlab_1.expect)(userProfile.name).to.equal(user.firstName);
    });
    it('user service convertToUserProfile() succeeds without optional field : firstName', () => {
        const userWithoutFirstName = Object.assign({}, user);
        delete userWithoutFirstName.firstName;
        const userProfile = userService.convertToUserProfile(userWithoutFirstName);
        (0, testlab_1.expect)(userProfile[security_1.securityId]).to.equal(user.id);
        (0, testlab_1.expect)(userProfile.name).to.equal(user.lastName);
    });
    it('token service generateToken() succeeds', async () => {
        const userProfile = userService.convertToUserProfile(user);
        const token = await jwtService.generateToken(userProfile);
        (0, testlab_1.expect)(token).to.not.be.empty();
    });
    it('token service verifyToken() succeeds', async () => {
        const userProfile = userService.convertToUserProfile(user);
        const token = await jwtService.generateToken(userProfile);
        const userProfileFromToken = await jwtService.verifyToken(token);
        (0, testlab_1.expect)(userProfileFromToken).to.deepEqual(userProfile);
    });
    it('token service verifyToken() fails', async () => {
        const expectedError = new rest_1.HttpErrors.Unauthorized(`Error verifying token : invalid token`);
        const invalidToken = 'aaa.bbb.ccc';
        await (0, testlab_1.expect)(jwtService.verifyToken(invalidToken)).to.be.rejectedWith(expectedError);
    });
    it('password encrypter hashPassword() succeeds', async () => {
        const encrypedPassword = await bcryptHasher.hashPassword(userPassword);
        (0, testlab_1.expect)(encrypedPassword).to.not.equal(userPassword);
    });
    it('password encrypter compare() succeeds', async () => {
        const encrypedPassword = await bcryptHasher.hashPassword(userPassword);
        const passwordsAreTheSame = await bcryptHasher.comparePassword(userPassword, encrypedPassword);
        (0, testlab_1.expect)(passwordsAreTheSame).to.be.True();
    });
    it('password encrypter compare() fails', async () => {
        const encrypedPassword = await bcryptHasher.hashPassword(userPassword);
        const passwordsAreTheSame = await bcryptHasher.comparePassword('someotherpassword', encrypedPassword);
        (0, testlab_1.expect)(passwordsAreTheSame).to.be.False();
    });
    async function setupApp() {
        const appWithClient = await (0, helper_1.setupApplication)();
        app = appWithClient.app;
        app.bind(keys_1.PasswordHasherBindings.ROUNDS).to(2);
    }
    async function createUser() {
        bcryptHasher = await app.get(keys_1.PasswordHasherBindings.PASSWORD_HASHER);
        const userWithPassword = new models_1.UserWithPassword(userData);
        userWithPassword.password = userPassword;
        user = await userManagementService.createUser(userWithPassword);
    }
    async function clearDatabase() {
        await userRepo.deleteAll();
    }
    async function createTokenService() {
        jwtService = await app.get(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE);
    }
    async function createUserService() {
        userService = await app.get(keys_1.UserServiceBindings.USER_SERVICE);
    }
});
//# sourceMappingURL=authentication.acceptance.js.map