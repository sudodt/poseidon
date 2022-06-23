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
exports.FETCH_AREAS = exports.FETCH_STREETS = exports.FETCH_WARDS = exports.FETCH_DISTRICTS = exports.FETCH_CITIES = void 0;
exports.FETCH_CITIES = 1;
exports.FETCH_DISTRICTS = 2;
exports.FETCH_WARDS = 3;
exports.FETCH_STREETS = 4;
exports.FETCH_AREAS = 5;
var initialState = {
    cities: [],
    districts: [],
    wards: [],
    streets: [],
    areas: []
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case exports.FETCH_CITIES:
            return __assign(__assign({}, state), { cities: action.payload });
        case exports.FETCH_DISTRICTS:
            return __assign(__assign({}, state), { districts: action.payload });
        case exports.FETCH_WARDS:
            return __assign(__assign({}, state), { wards: action.payload });
        case exports.FETCH_STREETS:
            return __assign(__assign({}, state), { streets: action.payload });
        case exports.FETCH_AREAS:
            return __assign(__assign({}, state), { areas: action.payload });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
