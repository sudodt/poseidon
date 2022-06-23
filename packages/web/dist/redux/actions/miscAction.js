"use strict";
exports.__esModule = true;
exports.toggleMobileMenu = exports.mobileDetect = void 0;
var miscReducer_1 = require("@/redux/reducers/miscReducer");
var mobileDetect = function (isMobile) {
    return function (dispatch) {
        dispatch({
            type: miscReducer_1.IS_MOBILE,
            payload: {
                isMobile: isMobile
            }
        });
    };
};
exports.mobileDetect = mobileDetect;
var toggleMobileMenu = function (isOpen) {
    return function (dispatch) {
        dispatch({
            type: miscReducer_1.TOGGLE_MOBILE_MENU,
            payload: {
                mobileMenuEnabled: isOpen
            }
        });
    };
};
exports.toggleMobileMenu = toggleMobileMenu;
