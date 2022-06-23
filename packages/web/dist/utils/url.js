"use strict";
exports.__esModule = true;
exports.getImageUrl = void 0;
var getImageUrl = function (image) {
    return process.env.STATIC + '/' + image;
};
exports.getImageUrl = getImageUrl;
