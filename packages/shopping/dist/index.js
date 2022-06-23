"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.PackageKey = exports.ShoppingApplication = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
var application_2 = require("./application");
Object.defineProperty(exports, "ShoppingApplication", { enumerable: true, get: function () { return application_2.ShoppingApplication; } });
Object.defineProperty(exports, "PackageKey", { enumerable: true, get: function () { return application_2.PackageKey; } });
tslib_1.__exportStar(require("./application"), exports);
async function main(options) {
    const app = new application_1.ShoppingApplication(options);
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    return app;
}
exports.main = main;
if (require.main === module) {
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            protocol: 'http',
            key: '',
            cert: '',
            host: process.env.HOST,
            ciphers: [],
            cors: {
                origin: [],
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204,
                maxAge: 86400,
                credentials: true,
            },
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                disabled: false,
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    // Run the application
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map