"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.UPDATE_META = void 0;
exports.UPDATE_META = 'update_meta';
var initialState = {
    title: '',
    description: ''
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var payload = action.payload || {};
    switch (action.type) {
        case exports.UPDATE_META:
            return __assign(__assign({}, state), { title: payload.title, description: payload.description });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
