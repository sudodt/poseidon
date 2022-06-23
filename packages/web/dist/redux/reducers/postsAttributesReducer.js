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
exports.FETCH_SPECIALTIES = exports.FETCH_ATTRIBUTES = exports.FETCH_CATEGORIES = void 0;
exports.FETCH_CATEGORIES = 'fetch_post_categoties';
exports.FETCH_ATTRIBUTES = 'fetch_post_attributes';
exports.FETCH_SPECIALTIES = 'fetch_post_specialties';
var initialState = {
    categories: [],
    attributes: {},
    specialties: []
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_CATEGORIES:
            return __assign(__assign({}, state), { categories: action.payload });
        case exports.FETCH_ATTRIBUTES:
            return __assign(__assign({}, state), { attributes: action.payload });
        case exports.FETCH_SPECIALTIES:
            return __assign(__assign({}, state), { specialties: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
