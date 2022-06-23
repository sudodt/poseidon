"use strict";
exports.__esModule = true;
exports.fetchUsersRequest = void 0;
var User_1 = require("@/services/User");
var userCollectionReducer_1 = require("../reducers/userCollectionReducer");
var fetchUsersRequest = function (_a) {
    var isServer = _a.isServer, data = _a.data;
    return function (dispatch) {
        return User_1["default"].fetch(data).then(function (response) {
            if (response) {
                dispatch({
                    type: userCollectionReducer_1.FETCH_COLLECTION_USER,
                    payload: {
                        data: response.data,
                        meta: response.meta,
                        additional: response.additional || {}
                    }
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchUsersRequest = fetchUsersRequest;
