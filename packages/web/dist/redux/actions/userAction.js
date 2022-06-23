"use strict";
exports.__esModule = true;
exports.fetchAgentPostsRequest = exports.fetchUserRequest = void 0;
var userReducer_1 = require("../reducers/userReducer");
var User_1 = require("@/services/User");
var fetchUserRequest = function (_a) {
    var isServer = _a.isServer, type = _a.type, code = _a.code;
    return function (dispatch) {
        return User_1["default"].getUser(type, code).then(function (response) {
            if (response) {
                dispatch({
                    type: userReducer_1.FETCH_USER,
                    payload: response === null || response === void 0 ? void 0 : response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchUserRequest = fetchUserRequest;
var fetchAgentPostsRequest = function (_a) {
    var isServer = _a.isServer, type = _a.type, userId = _a.userId, query = _a.query;
    return function (dispatch) {
        return User_1["default"].getAgencyPosts(userId, query).then(function (response) {
            if (response) {
                dispatch({
                    type: type,
                    payload: {
                        data: response === null || response === void 0 ? void 0 : response.data,
                        meta: response === null || response === void 0 ? void 0 : response.meta
                    }
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchAgentPostsRequest = fetchAgentPostsRequest;
