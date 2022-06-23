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
exports.TOGGLE_MOBILE_MENU = exports.IS_MOBILE = void 0;
exports.IS_MOBILE = 'IS_MOBILE';
exports.TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';
var initialState = {
    isMobile: false,
    mobileMenuEnabled: false
};
var childrenReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var payload = action.payload || {};
    switch (action.type) {
        case exports.IS_MOBILE:
            return __assign(__assign({}, state), { isMobile: payload.isMobile });
        case exports.TOGGLE_MOBILE_MENU:
            return __assign(__assign({}, state), { mobileMenuEnabled: payload.mobileMenuEnabled });
        default: return __assign({}, state);
    }
};
exports["default"] = childrenReducer;
