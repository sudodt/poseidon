"use strict";
exports.__esModule = true;
exports.clearLocations = exports.fetchLocationsRequest = void 0;
var Location_1 = require("@/services/Location");
var fetchLocationsRequest = function (_a) {
    var isServer = _a.isServer, type = _a.type, parent_id = _a.parent_id;
    return function (dispatch) {
        return Location_1["default"].fetch({
            isServer: isServer,
            data: { type: type, parent_id: parent_id }
        }).then(function (response) {
            if (response) {
                dispatch({
                    type: type,
                    payload: response.data
                });
            }
        })["catch"](function (error) {
            console.log(error);
            // dispatch(fetchAccount(false));
        });
    };
};
exports.fetchLocationsRequest = fetchLocationsRequest;
var clearLocations = function (type) {
    return function (dispatch) {
        dispatch({
            type: type,
            payload: []
        });
    };
};
exports.clearLocations = clearLocations;
