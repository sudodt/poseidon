"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddlewareProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
let ErrorHandlerMiddlewareProvider = class ErrorHandlerMiddlewareProvider {
    constructor(logError) {
        this.logError = logError;
    }
    async value() {
        const middleware = async (ctx, next) => {
            try {
                return await next();
            }
            catch (err) {
                // Any error handling goes here
                return this.handleError(ctx, err);
            }
        };
        return middleware;
    }
    handleError(context, err) {
        // We simply log the error although more complex scenarios can be performed
        // such as customizing errors for a specific endpoint
        this.logError(err, err.statusCode, context.request);
        throw err;
    }
};
ErrorHandlerMiddlewareProvider = tslib_1.__decorate([
    (0, core_1.injectable)((0, rest_1.asMiddleware)({
        group: 'validationError',
        upstreamGroups: rest_1.RestMiddlewareGroups.SEND_RESPONSE,
        downstreamGroups: rest_1.RestMiddlewareGroups.CORS,
    })),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.LOG_ERROR)),
    tslib_1.__metadata("design:paramtypes", [Function])
], ErrorHandlerMiddlewareProvider);
exports.ErrorHandlerMiddlewareProvider = ErrorHandlerMiddlewareProvider;
//# sourceMappingURL=error-handler.middleware.js.map