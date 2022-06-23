"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const security_1 = require("@loopback/security");
const testlab_1 = require("@loopback/testlab");
const loopback4_example_recommender_1 = require("loopback4-example-recommender");
const services_1 = require("../../services");
const helper_1 = require("./helper");
const models_1 = require("../../models");
const recommendations = require('loopback4-example-recommender/data/recommendations.json');
describe('UserManagementController', () => {
    let app;
    let client;
    let userManagementService;
    let userRepo;
    let controller;
    const userData = {
        email: 'test@loopback.io',
        firstName: 'Example',
        lastName: 'User',
        roles: ['customer'],
        resetKey: '',
    };
    const userPassword = 'p4ssw0rd';
    let expiredToken;
    before('setupApplication', async () => {
        ({ app, client } = await (0, helper_1.setupApplication)());
        userRepo = await app.get('repositories.UserRepository');
        userManagementService = await app.get('services.user.service');
        // link tests to controller
        (0, testlab_1.expect)(controller).to.be.undefined();
    });
    before(migrateSchema);
    before(givenAnExpiredToken);
    beforeEach(clearDatabase);
    after(async () => {
        await app.stop();
    });
    it('creates new user when POST /users is invoked', async () => {
        const res = await client
            .post('/users')
            .send({ ...userData, password: userPassword })
            .expect(200);
        // Assertions
        (0, testlab_1.expect)(res.body.email).to.equal('test@loopback.io');
        (0, testlab_1.expect)(res.body.firstName).to.equal('Example');
        (0, testlab_1.expect)(res.body.lastName).to.equal('User');
        (0, testlab_1.expect)(res.body).to.have.property('id');
        (0, testlab_1.expect)(res.body).to.not.have.property('password');
    });
    it('creates a new user with the given id', async () => {
        // This test verifies the scenario described in our docs, see
        // https://loopback.io/doc/en/lb4/Authentication-Tutorial.html
        const res = await client.post('/users').send({
            id: '5dd6acee242760334f6aef65',
            ...userData,
            password: userPassword,
        });
        (0, testlab_1.expect)(res.body).to.deepEqual({
            id: '5dd6acee242760334f6aef65',
            ...userData,
        });
    });
    it('throws error for POST /users with a missing email', async () => {
        const res = await client
            .post('/users')
            .send({
            password: 'p4ssw0rd',
            firstName: 'Example',
            lastName: 'User',
        })
            .expect(422);
        (0, testlab_1.expect)(res.error).to.not.eql(false);
        const resError = res.error;
        const errorText = JSON.parse(resError.text);
        (0, testlab_1.expect)(errorText.error.details[0].info.missingProperty).to.equal('email');
    });
    it('throws error for POST /users with an invalid email', async () => {
        const res = await client
            .post('/users')
            .send({
            email: 'test@loop&back.io',
            password: 'p4ssw0rd',
            firstName: 'Example',
            lastName: 'User',
        })
            .expect(422);
        (0, testlab_1.expect)(res.body.error.message).to.equal('invalid email');
    });
    it('throws error for POST /users with a missing password', async () => {
        const res = await client
            .post('/users')
            .send({
            email: 'test@loopback.io',
            firstName: 'Example',
            lastName: 'User',
        })
            .expect(422);
        (0, testlab_1.expect)(res.error).to.not.eql(false);
        const resError = res.error;
        const errorText = JSON.parse(resError.text);
        (0, testlab_1.expect)(errorText.error.details[0].info.missingProperty).to.equal('password');
    });
    it('throws error for POST /users with a string', async () => {
        const res = await client.post('/users').send('hello').expect(415);
        (0, testlab_1.expect)(res.body.error.message).to.equal('Content-type application/x-www-form-urlencoded does not match [application/json].');
    });
    it('throws error for POST /users with an existing email', async () => {
        await client
            .post('/users')
            .send({ ...userData, password: userPassword })
            .expect(200);
        const res = await client
            .post('/users')
            .send({ ...userData, password: userPassword })
            .expect(409);
        (0, testlab_1.expect)(res.body.error.message).to.equal('Email value is already taken');
    });
    it('protects GET /users/{id} with authorization', async () => {
        const newUser = await createAUser();
        await client.get(`/users/${newUser.id}`).expect(401);
    });
    describe('forgot-password', () => {
        it('throws error for PUT /users/forgot-password when resetting password for non logged in account', async () => {
            const token = await authenticateUser();
            const res = await client
                .put('/users/forgot-password')
                .set('Authorization', 'Bearer ' + token)
                .send({
                email: 'john@example.io',
                password: 'p4ssw0rd',
            })
                .expect(403);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Invalid email address');
        });
        it('password reset returns an error when invalid password is used', async () => {
            const token = await authenticateUser();
            const res = await client
                .put('/users/forgot-password')
                .set('Authorization', 'Bearer ' + token)
                .send({ email: 'test@example.com', password: '12345' })
                .expect(422);
            (0, testlab_1.expect)(res.body.error.details[0].message).to.equal('must NOT have fewer than 8 characters');
        });
        it('returns token for a successful password reset', async () => {
            const token = await authenticateUser();
            const res = await client
                .put('/users/forgot-password')
                .set('Authorization', 'Bearer ' + token)
                .send({ email: userData.email, password: 'password@12345678' })
                .expect(200);
            (0, testlab_1.expect)(res.body.token).to.not.be.empty();
        });
    });
    describe('reset-password-init', () => {
        it('throws error for POST /users/reset-password-init with an invalid email', async () => {
            const res = await client
                .post('/users/reset-password/init')
                .send({ email: 'john' })
                .expect(422);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Invalid email address');
        });
        it('throws error for POST /users/reset-password-init for non-existent account email', async () => {
            const res = await client
                .post('/users/reset-password/init')
                .send({ email: 'john@example' })
                .expect(404);
            (0, testlab_1.expect)(res.body.error.message).to.equal('No account associated with the provided email address.');
        });
        it('password reset throws error if email config is invalid', async () => {
            const tempData = {
                email: 'john@loopback.io',
                firstName: 'Example',
                lastName: 'User',
                roles: ['customer'],
                resetKey: '',
            };
            await client
                .post('/users')
                .send({ ...tempData, password: userPassword })
                .expect(200);
            await client
                .post('/users/reset-password/init')
                .send({ email: 'john@loopback.io' })
                .expect(500);
        });
        // TODO (mrmodise) configure environment variables in pipelines to add positive scenario test cases
    });
    describe('reset-password-finish', () => {
        it('throws error for PUT /users/reset-password-finish with an invalid key', async () => {
            const res = await client
                .put('/users/reset-password/finish')
                .send(new models_1.KeyAndPassword({
                resetKey: 'john',
                password: 'password1234',
                confirmPassword: 'password1234',
            }))
                .expect(404);
            (0, testlab_1.expect)(res.body.error.message).to.equal('No associated account for the provided reset key');
        });
        it('throws error for PUT /users/reset-password-finish with mismatch passwords', async () => {
            const res = await client
                .put('/users/reset-password/finish')
                .send(new models_1.KeyAndPassword({
                resetKey: 'john',
                password: 'password123',
                confirmPassword: 'password1234',
            }))
                .expect(422);
            (0, testlab_1.expect)(res.body.error.message).to.equal('password and confirmation password do not match');
        });
    });
    describe('authentication', () => {
        it('login returns a JWT token', async () => {
            const newUser = await createAUser();
            const res = await client
                .post('/users/login')
                .send({ email: newUser.email, password: userPassword })
                .expect(200);
            const token = res.body.token;
            (0, testlab_1.expect)(token).to.not.be.empty();
        });
        it('login returns an error when invalid email is used', async () => {
            await createAUser();
            const res = await client
                .post('/users/login')
                .send({ email: 'idontexist@example.com', password: userPassword })
                .expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Invalid email or password.');
        });
        it('login returns an error when invalid password is used', async () => {
            const newUser = await createAUser();
            const res = await client
                .post('/users/login')
                .send({ email: newUser.email, password: 'wrongpassword' })
                .expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Invalid email or password.');
        });
        it('users/me returns the current user profile when a valid JWT token is provided', async () => {
            const newUser = await createAUser();
            let res = await client
                .post('/users/login')
                .send({ email: newUser.email, password: userPassword })
                .expect(200);
            const token = res.body.token;
            res = await client
                .get('/users/me')
                .set('Authorization', 'Bearer ' + token)
                .expect(200);
            const userProfile = res.body;
            (0, testlab_1.expect)(userProfile.id).to.equal(newUser.id);
            (0, testlab_1.expect)(userProfile.firstName).to.equal(newUser.firstName);
            (0, testlab_1.expect)(userProfile.lastName).to.equal(newUser.lastName);
            (0, testlab_1.expect)(userProfile.roles).to.deepEqual(newUser.roles);
        });
        it('users/me returns an error when a JWT token is not provided', async () => {
            const res = await client.get('/users/me').expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Authorization header not found.');
        });
        it('users/me returns an error when an invalid JWT token is provided', async () => {
            const res = await client
                .get('/users/me')
                .set('Authorization', 'Bearer ' + 'xxx.yyy.zzz')
                .expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Error verifying token : invalid token');
        });
        it(`users/me returns an error when 'Bearer ' is not found in Authorization header`, async () => {
            const res = await client
                .get('/users/me')
                .set('Authorization', 'NotB3@r3r ' + 'xxx.yyy.zzz')
                .expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal("Authorization header is not of type 'Bearer'.");
        });
        it('users/me returns an error when an expired JWT token is provided', async () => {
            const res = await client
                .get('/users/me')
                .set('Authorization', 'Bearer ' + expiredToken)
                .expect(401);
            (0, testlab_1.expect)(res.body.error.message).to.equal('Error verifying token : jwt expired');
        });
    });
    describe('user product recommendation (service) api', () => {
        let recommendationService;
        let recommendationGRPCService;
        before(async () => {
            recommendationService = (0, loopback4_example_recommender_1.createRecommendationServer)();
            await recommendationService.start();
            recommendationGRPCService = (await (0, loopback4_example_recommender_1.createGRPCRecommendationServer)('0.0.0.0:50000')).server;
            recommendationGRPCService.start();
        });
        after(async () => {
            await recommendationService.stop();
            if (recommendationGRPCService) {
                recommendationGRPCService.forceShutdown();
            }
        });
        it('returns product recommendations for a user', async () => {
            const newUser = await createAUser();
            await client
                .get(`/users/${newUser.id}/recommend`)
                .expect(200, recommendations['user001']);
        });
        it('returns product recommendations for a user using gRPC', async () => {
            const recommender = await app.get('services.RecommenderGrpcService');
            const products = await recommender.getProductRecommendations('user001');
            (0, testlab_1.expect)(products).to.eql(recommendations['user001']);
        });
    });
    async function clearDatabase() {
        await userRepo.deleteAll();
    }
    async function migrateSchema() {
        await app.migrateSchema();
    }
    async function createAUser() {
        const userWithPassword = new models_1.UserWithPassword(userData);
        userWithPassword.password = userPassword;
        return userManagementService.createUser(userWithPassword);
    }
    /**
     * Creates an expired token
     *
     * Specifying a negative value for 'expiresIn' so the
     * token is automatically expired
     */
    async function givenAnExpiredToken() {
        const newUser = await createAUser();
        const jwtSecret = app.getSync(authentication_jwt_1.TokenServiceBindings.TOKEN_SECRET);
        const tokenService = new services_1.JWTService(jwtSecret, '-1');
        const userProfile = {
            [security_1.securityId]: newUser.id,
            name: `${newUser.firstName} ${newUser.lastName}`,
        };
        expiredToken = await tokenService.generateToken(userProfile);
    }
    async function authenticateUser() {
        const user = await createAUser();
        const res = await client
            .post('/users/login')
            .send({ email: user.email, password: userPassword })
            .expect(200);
        return res.body.token;
    }
});
//# sourceMappingURL=user-management.controller.acceptance.js.map