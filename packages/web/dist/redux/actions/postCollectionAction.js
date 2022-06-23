"use strict";
exports.__esModule = true;
exports.updateQuery = exports.fetchPostsSeoMetaRequest = exports.fetchPostsRequest = exports.fetchOutstandingPostRequest = void 0;
var postCollectionReducer_1 = require("../reducers/postCollectionReducer");
var Posts_1 = require("@/services/Posts");
var fetchOutstandingPostRequest = function (_a) {
    var isServer = _a.isServer;
    return function (dispatch) {
        return Posts_1["default"].fetchOutstanding({ isServer: isServer }).then(function (response) {
            if (response) {
                dispatch({
                    type: postCollectionReducer_1.FETCH_OUTSTANDING_POST,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
            // dispatch(fetchAccount(false));
        });
    };
};
exports.fetchOutstandingPostRequest = fetchOutstandingPostRequest;
var fetchPostsRequest = function (_a) {
    var isServer = _a.isServer, data = _a.data;
    return function (dispatch) {
        return Posts_1["default"].fetch({ isServer: isServer, data: data }).then(function (response) {
            var _a;
            if (response) {
                dispatch({
                    type: postCollectionReducer_1.FETCH_COLLECTION_POST,
                    payload: {
                        data: response.data,
                        meta: (_a = response === null || response === void 0 ? void 0 : response.meta) !== null && _a !== void 0 ? _a : {}
                    }
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchPostsRequest = fetchPostsRequest;
var fetchPostsSeoMetaRequest = function (_a) {
    var isServer = _a.isServer, data = _a.data;
    return function (dispatch) {
        return Posts_1["default"].fetchSeoMeta({ isServer: isServer, data: data }).then(function (response) {
            if (response) {
                dispatch({
                    type: postCollectionReducer_1.FETCH_POSTSCOLLECTION_SEO,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
};
exports.fetchPostsSeoMetaRequest = fetchPostsSeoMetaRequest;
var updateQuery = function (searchQuery) {
    return function (dispatch) {
        dispatch({
            type: postCollectionReducer_1.UPDATE_POSTS_QUERY,
            payload: searchQuery
        });
    };
};
exports.updateQuery = updateQuery;
