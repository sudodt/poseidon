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
exports.UPDATE_POSTS_QUERY = exports.UPDATE_POST_DOMAIN = exports.FETCH_POSTSCOLLECTION_SEO = exports.FETCH_SUGGESTED_POST = exports.FETCH_COLLECTION_POST = exports.FETCH_OUTSTANDING_POST = void 0;
exports.FETCH_OUTSTANDING_POST = 'FETCH_OUTSTANDING_POST';
exports.FETCH_COLLECTION_POST = 'FETCH_COLLECTION_POST';
exports.FETCH_SUGGESTED_POST = 'FETCH_SUGGESTED_POST';
exports.FETCH_POSTSCOLLECTION_SEO = 'FETCH_POSTSCOLLECTION_SEO';
exports.UPDATE_POST_DOMAIN = 'UPDATE_POST_DOMAIN';
exports.UPDATE_POSTS_QUERY = 'UPDATE_POSTS_QUERY';
var initialState = {
    outstanding: [],
    search: {
        data: []
    },
    suggested: [],
    query: {}
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_OUTSTANDING_POST:
            return __assign(__assign({}, state), { outstanding: action.payload });
        case exports.FETCH_COLLECTION_POST:
            return __assign(__assign({}, state), { search: action.payload });
        case exports.FETCH_SUGGESTED_POST:
            return __assign(__assign({}, state), { suggested: action.payload });
        case exports.FETCH_POSTSCOLLECTION_SEO:
            return __assign(__assign({}, state), { seo: action.payload });
        case exports.UPDATE_POSTS_QUERY:
            return __assign(__assign({}, state), { query: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
