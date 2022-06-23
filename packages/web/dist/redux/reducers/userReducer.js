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
exports.FETCH_POSTS_RENT = exports.FETCH_POSTS_BUYSOILD = exports.FETCH_USER = void 0;
exports.FETCH_USER = 'FETCH_USER';
exports.FETCH_POSTS_BUYSOILD = 'FETCH_POSTS_BUYSOILD';
exports.FETCH_POSTS_RENT = 'FETCH_POSTS_RENT';
var initialState = {
    data: {},
    buysoild: {
        data: [],
        meta: {}
    },
    rent: {
        data: [],
        meta: {}
    }
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_USER:
            return __assign(__assign({}, state), { data: action.payload });
        case exports.FETCH_POSTS_BUYSOILD:
            return __assign(__assign({}, state), { buysoild: action.payload });
        case exports.FETCH_POSTS_RENT:
            return __assign(__assign({}, state), { rent: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
