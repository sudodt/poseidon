"use strict";
exports.__esModule = true;
exports.fetchAccountPostsRequest = exports.fetchAccountRequest = void 0;
var accountsReducer_1 = require("../reducers/accountsReducer");
var Account_1 = require("@/services/Account");
var fetchAccountRequest = function (_a) {
    var isServer = _a.isServer, token = _a.token;
    return function (dispatch) {
        return Account_1["default"].getAccount({ token: token, isServer: isServer }).then(function (response) {
            return dispatch({
                type: accountsReducer_1.FETCH_ACCOUNT,
                payload: response.data
            });
        });
    };
};
exports.fetchAccountRequest = fetchAccountRequest;
var fetchAccountPostsRequest = function (_a) {
    var isServer = _a.isServer, token = _a.token, _b = _a.filter, filter = _b === void 0 ? [] : _b;
    return function (dispatch) {
        return Account_1["default"].getPosts({ token: token, isServer: isServer, filter: filter }).then(function (response) {
            return dispatch({
                type: accountsReducer_1.FETCH_ACCOUNT_POSTS,
                payload: response.data
            });
        });
    };
};
exports.fetchAccountPostsRequest = fetchAccountPostsRequest;
