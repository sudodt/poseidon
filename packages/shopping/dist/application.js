"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingApplication = exports.PackageKey = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const keys_1 = require("./keys");
const models_1 = require("./models");
const repositories_1 = require("./repositories");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
const YAML = require("yaml");
const middlewares_1 = require("./middlewares");
exports.PackageKey = core_1.BindingKey.create('application.package');
const pkg = require('../package.json');
class ShoppingApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options) {
        super(options);
        // Bind authentication component related elements
        this.component(authentication_1.AuthenticationComponent);
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.setUpBindings();
        // Set up the custom sequence
        this.sequence(sequence_1.ShoppySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    setUpBindings() {
        var _a;
        // Bind package.json to the application context
        this.bind(exports.PackageKey).to(pkg);
        // Bind bcrypt hash services
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(services_1.BcryptHasher);
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE).toClass(services_1.JWTService);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(services_1.UserManagementService);
        this.add((0, core_1.createBindingFromClass)(services_1.SecuritySpecEnhancer));
        this.add((0, core_1.createBindingFromClass)(middlewares_1.ErrorHandlerMiddlewareProvider));
        // Use JWT secret from JWT_SECRET environment variable if set
        // otherwise create a random string of 64 hex digits
        const secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : crypto_1.default.randomBytes(32).toString('hex');
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SECRET).to(secret);
    }
    // Unfortunately, TypeScript does not allow overriding methods inherited
    // from mapped types. https://github.com/microsoft/TypeScript/issues/38496
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async start() {
        // Use `databaseSeeding` flag to control if products/users should be pre
        // populated into the database. Its value is default to `true`.
        if (this.options.databaseSeeding !== false) {
            await this.migrateSchema();
        }
        return super.start();
    }
    async migrateSchema(options) {
        await super.migrateSchema(options);
        // Pre-populate products
        const productRepo = await this.getRepository(repositories_1.ProductRepository);
        await productRepo.deleteAll();
        const productsDir = path_1.default.join(__dirname, '../fixtures/products');
        const productFiles = fs_1.default.readdirSync(productsDir);
        for (const file of productFiles) {
            if (file.endsWith('.yml')) {
                const productFile = path_1.default.join(productsDir, file);
                const yamlString = fs_1.default.readFileSync(productFile, 'utf8');
                const product = YAML.parse(yamlString);
                await productRepo.create(product);
            }
        }
        // Pre-populate users
        const userRepo = await this.getRepository(repositories_1.UserRepository);
        await userRepo.deleteAll();
        const usersDir = path_1.default.join(__dirname, '../fixtures/users');
        const userFiles = fs_1.default.readdirSync(usersDir);
        for (const file of userFiles) {
            if (file.endsWith('.yml')) {
                const userFile = path_1.default.join(usersDir, file);
                const yamlString = YAML.parse(fs_1.default.readFileSync(userFile, 'utf8'));
                const userWithPassword = new models_1.UserWithPassword(yamlString);
                const userManagementService = await this.get(keys_1.UserServiceBindings.USER_SERVICE);
                await userManagementService.createUser(userWithPassword);
            }
        }
        // Delete existing shopping carts
        const cartRepo = await this.getRepository(repositories_1.ShoppingCartRepository);
        await cartRepo.deleteAll();
        // Delete existing orders
        const orderRepo = await this.getRepository(repositories_1.OrderRepository);
        await orderRepo.deleteAll();
    }
}
exports.ShoppingApplication = ShoppingApplication;
//# sourceMappingURL=application.js.map