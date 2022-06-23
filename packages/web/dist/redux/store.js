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
exports.wrapper = void 0;
var redux_1 = require("redux");
var next_redux_wrapper_1 = require("next-redux-wrapper");
var redux_thunk_1 = require("redux-thunk");
var rootReducer_1 = require("@/redux/reducers/rootReducer");
var bindMiddleware = function (middleware) {
    if (process.env.NODE_ENV !== 'production') {
        var composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;
        return composeWithDevTools(redux_1.applyMiddleware.apply(void 0, middleware));
    }
    return redux_1.applyMiddleware.apply(void 0, middleware);
};
var reducer = function (state, action) {
    if (action.type === next_redux_wrapper_1.HYDRATE) {
        var nextState = __assign(__assign({}, state), action.payload);
        if (state.count)
            nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    }
    else {
        return rootReducer_1["default"](state, action);
    }
};
var initStore = function () {
    return redux_1.createStore(reducer, bindMiddleware([redux_thunk_1["default"]]));
};
exports.wrapper = next_redux_wrapper_1.createWrapper(initStore);
