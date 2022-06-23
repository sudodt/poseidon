"use strict";
exports.__esModule = true;
exports.useDebounce = void 0;
var react_1 = require("react");
var useDebounce = function (value, delay) {
    if (delay === void 0) { delay = 500; }
    var _a = react_1.useState(), debouncedValue = _a[0], setDebouncedValue = _a[1];
    var timer = react_1.useRef(null);
    react_1.useEffect(function () {
        timer.current = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () { return clearTimeout(timer.current); };
    }, [value, delay]);
    return debouncedValue;
};
exports.useDebounce = useDebounce;
