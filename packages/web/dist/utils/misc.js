"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.insert = void 0;
var insert = function (arr, index, newItem) { return __spreadArray(__spreadArray(__spreadArray([], arr.slice(0, index)), [
    newItem
]), arr.slice(index)); };
exports.insert = insert;
