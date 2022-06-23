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
exports.useScrollData = void 0;
var React = require("react");
var SCROLL_END_DURATION = 100;
var INITIAL_DATA = {
    scrolling: false,
    time: 0,
    direction: {
        x: null,
        y: null
    },
    speed: {
        x: 0,
        y: 0
    },
    totalDistance: {
        x: 0,
        y: 0
    },
    relativeDistance: {
        x: 0,
        y: 0
    },
    position: {
        x: 0,
        y: 0
    }
};
function getPositionX() {
    return window.pageXOffset || 0;
}
function getPositionY() {
    return window.pageYOffset || 0;
}
function getDirectionX(x, frameValues) {
    if (x > frameValues.position.x)
        return "right";
    if (x < frameValues.position.x)
        return "left";
    return null;
}
function getDirectionY(y, frameValues) {
    if (y > frameValues.position.y)
        return "down";
    if (y < frameValues.position.y)
        return "up";
    return null;
}
function getTotalDistanceX(x, frameValues) {
    return frameValues.totalDistance.x + Math.abs(x - frameValues.position.x);
}
function getTotalDistanceY(y, frameValues) {
    return frameValues.totalDistance.y + Math.abs(y - frameValues.position.y);
}
function getRelativeDistanceX(x, startValues) {
    return Math.abs(x - startValues.position.x);
}
function getRelativeDistanceY(y, startValues) {
    return Math.abs(y - startValues.position.y);
}
var useScrollData = function (options) {
    if (options === void 0) { options = {}; }
    var _a = React.useState(INITIAL_DATA), data = _a[0], setData = _a[1];
    var startValues = React.useRef(INITIAL_DATA);
    var frameValues = React.useRef(INITIAL_DATA);
    var startTimestamp = React.useRef();
    var frameTimestamp = React.useRef();
    var scrollTimeout = React.useRef(null);
    var raf = React.useRef(null);
    function frame(timestamp) {
        if (!startTimestamp.current)
            startTimestamp.current = timestamp;
        // Calculate the time in ms that scrolling is active
        var time = timestamp - startTimestamp.current;
        // Set new position values
        var position = {
            x: getPositionX(),
            y: getPositionY()
        };
        // Set new direction values
        var direction = {
            x: getDirectionX(position.x, frameValues.current),
            y: getDirectionY(position.y, frameValues.current)
        };
        // Set new totalDistance values
        var totalDistance = {
            x: getTotalDistanceX(position.x, frameValues.current),
            y: getTotalDistanceY(position.y, frameValues.current)
        };
        // Set new relativeDistance values
        var relativeDistance = {
            x: getRelativeDistanceX(position.x, startValues.current),
            y: getRelativeDistanceY(position.y, startValues.current)
        };
        // Set new speed values
        var timestampDiff = timestamp - (frameTimestamp.current || 0);
        var speed = {
            x: (Math.abs(frameValues.current.position.x - position.x) /
                Math.max(1, timestampDiff)) *
                1000,
            y: (Math.abs(frameValues.current.position.y - position.y) /
                Math.max(1, timestampDiff)) *
                1000
        };
        var nextframeValues = __assign(__assign({}, frameValues.current), { scrolling: true, time: time, direction: direction, speed: speed, totalDistance: totalDistance, relativeDistance: relativeDistance, position: position });
        // Store new values
        frameValues.current = nextframeValues;
        // Update the state
        setData(nextframeValues);
        // Set frameTimestamp for speed calculation
        frameTimestamp.current = timestamp;
        // We're still scrolling, so call tick method again
        raf.current = requestAnimationFrame(frame);
    }
    function clearAndSetscrollTimeout() {
        if (scrollTimeout.current)
            clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(scrollEnd, SCROLL_END_DURATION);
    }
    function onScroll() {
        if (!frameValues.current.scrolling) {
            scrollStart();
        }
        clearAndSetscrollTimeout();
    }
    function scrollStart() {
        // Save data at the moment of starting so we have
        // something to compare the current values against
        startValues.current = __assign({}, frameValues.current);
        // Start RAF
        raf.current = requestAnimationFrame(frame);
        // If present, call onScrollStart function
        if (typeof options.onScrollStart === "function") {
            options.onScrollStart();
        }
    }
    function scrollEnd() {
        // Reset scroll data
        frameValues.current = __assign(__assign({}, frameValues.current), { scrolling: false, time: 0, direction: {
                x: null,
                y: null
            }, speed: {
                x: 0,
                y: 0
            }, totalDistance: {
                x: 0,
                y: 0
            }, relativeDistance: {
                x: 0,
                y: 0
            } });
        // Update the state
        setData(frameValues.current);
        // Cancel RAF
        cancelAnimationFrame(raf.current);
        startTimestamp.current = null;
        frameTimestamp.current = null;
        // If present, call onScrollEnd function
        if (typeof options.onScrollEnd === "function") {
            options.onScrollEnd();
        }
    }
    React.useEffect(function () {
        // Add scrollListener
        window.addEventListener("scroll", onScroll, true);
        // Remove listener when unmounting
        return function () {
            clearTimeout(scrollTimeout.current);
            window.removeEventListener("scroll", onScroll, true);
        };
    }, []);
    // Return data with rounded values
    return __assign(__assign({}, data), { time: Math.round(data.time), speed: {
            x: Math.round(data.speed.x),
            y: Math.round(data.speed.y)
        }, totalDistance: {
            x: Math.round(data.totalDistance.x),
            y: Math.round(data.totalDistance.y)
        }, relativeDistance: {
            x: Math.round(data.relativeDistance.x),
            y: Math.round(data.relativeDistance.y)
        }, position: {
            x: Math.round(data.position.x),
            y: Math.round(data.position.y)
        } });
};
exports.useScrollData = useScrollData;
