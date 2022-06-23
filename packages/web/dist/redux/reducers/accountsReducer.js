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
exports.FETCH_ACCOUNT_POSTS = exports.FETCH_ACCOUNT = void 0;
exports.FETCH_ACCOUNT = 'FETCH_ACCOUNT';
exports.FETCH_ACCOUNT_POSTS = 'FETCH_ACCOUNT_POSTS';
var initialState = {
    account: {},
    posts: []
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_ACCOUNT:
            return __assign(__assign({}, state), { account: action.payload });
        case exports.FETCH_ACCOUNT_POSTS:
            return __assign(__assign({}, state), { posts: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
