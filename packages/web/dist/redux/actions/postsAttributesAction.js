"use strict";
exports.__esModule = true;
exports.fetchSpecialtiesRequest = exports.fetchAttributesRequest = exports.fetchCategoriesRequest = void 0;
var postsAttributesReducer_1 = require("../reducers/postsAttributesReducer");
var Posts_1 = require("@/services/Posts");
var fetchCategoriesRequest = function (_a) {
    var isServer = _a.isServer;
    return function (dispatch) {
        return Posts_1["default"].fetchCategories().then(function (response) {
            if (response) {
                dispatch({
                    type: postsAttributesReducer_1.FETCH_CATEGORIES,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
            // dispatch(fetchAccount(false));
        });
    };
};
exports.fetchCategoriesRequest = fetchCategoriesRequest;
var fetchAttributesRequest = function () {
    return function (dispatch) {
        return Posts_1["default"].fetchAttributes().then(function (response) {
            if (response) {
                dispatch({
                    type: postsAttributesReducer_1.FETCH_ATTRIBUTES,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
            // dispatch(fetchAccount(false));
        });
    };
};
exports.fetchAttributesRequest = fetchAttributesRequest;
var fetchSpecialtiesRequest = function (category_id) {
    return function (dispatch) {
        return Posts_1["default"].fetchSpecialties({ "category_id": category_id }).then(function (response) {
            if (response) {
                dispatch({
                    type: postsAttributesReducer_1.FETCH_SPECIALTIES,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
            // dispatch(fetchAccount(false));
        });
    };
};
exports.fetchSpecialtiesRequest = fetchSpecialtiesRequest;
