"use strict";
exports.__esModule = true;
exports.getCode = exports.getUserAvatar = void 0;
var getUserAvatar = function (profile) {
    if (!profile)
        return process.env.USER_NO_IMAGE || '';
    var avatar = profile.avatar || 'upload/user.png';
    return process.env.STATIC + '/' + avatar;
};
exports.getUserAvatar = getUserAvatar;
var getCode = function (path) {
    var part = path.split('uid');
    return part.slice(-1).pop().replace('-', '');
};
exports.getCode = getCode;
