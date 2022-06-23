"use strict";
exports.__esModule = true;
exports.fetchPostRequest = void 0;
var postReducer_1 = require("../reducers/postReducer");
var Posts_1 = require("@/services/Posts");
var fetchPostRequest = function (_a) {
    var isServer = _a.isServer, code = _a.code;
    return function (dispatch) {
        return Posts_1["default"].fetchByCode({ isServer: isServer, code: code }).then(function (response) {
            if (response) {
                dispatch({
                    type: postReducer_1.FETCH_POST,
                    payload: response === null || response === void 0 ? void 0 : response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchPostRequest = fetchPostRequest;
