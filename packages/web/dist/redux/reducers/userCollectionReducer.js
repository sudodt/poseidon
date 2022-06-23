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
exports.FETCH_SUGGESTED_USER = exports.FETCH_COLLECTION_USER = void 0;
exports.FETCH_COLLECTION_USER = 'FETCH_COLLECTION_USER';
exports.FETCH_SUGGESTED_USER = 'FETCH_SUGGESTED_USER';
var initialState = {
    outstanding: [],
    search: {
        data: [],
        meta: {},
        additional: {}
    },
    suggested: [],
    query: {}
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_COLLECTION_USER:
            return __assign(__assign({}, state), { search: action.payload });
        case exports.FETCH_SUGGESTED_USER:
            return __assign(__assign({}, state), { suggested: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
