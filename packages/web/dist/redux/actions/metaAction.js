"use strict";
exports.__esModule = true;
exports.updateMeta = void 0;
var metaReducer_1 = require("../reducers/metaReducer");
var updateMeta = function (meta) {
    return function (dispatch) {
        dispatch({
            type: metaReducer_1.UPDATE_META,
            payload: meta
        });
    };
};
exports.updateMeta = updateMeta;
