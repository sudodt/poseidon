"use strict";
exports.__esModule = true;
var react_1 = require("react");
var getMobileDetect = function (userAgent) {
    var isAndroid = function () { return Boolean(userAgent.match(/Android/i)); };
    var isIos = function () { return Boolean(userAgent.match(/iPhone|iPad|iPod/i)); };
    var isOpera = function () { return Boolean(userAgent.match(/Opera Mini/i)); };
    var isWindows = function () { return Boolean(userAgent.match(/IEMobile/i)); };
    var isSSR = function () { return Boolean(userAgent.match(/SSR/i)); };
    var isMobile = function () { return Boolean(isAndroid() || isIos() || isOpera() || isWindows()); };
    var isDesktop = function () { return Boolean(!isMobile() && !isSSR()); };
    return {
        isMobile: isMobile,
        isDesktop: isDesktop,
        isAndroid: isAndroid,
        isIos: isIos,
        isSSR: isSSR
    };
};
var useMobileDetect = function () {
    react_1.useEffect(function () { }, []);
    var userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    return getMobileDetect(userAgent);
};
exports["default"] = useMobileDetect;
