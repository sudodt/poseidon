"use strict";
exports.__esModule = true;
exports.getThumbImageSrc = exports.getCode = exports.checkViewType = exports.getUrl = exports.filterToSlug = exports.routeToSearchFilter = void 0;
var app_json_1 = require("../config/app.json");
var routeToSearchFilter = function (slug, query) {
    var detected = false;
    var demand = false;
    var category = false;
    var searchQuery = {};
    var demandData = app_json_1["default"].demandData;
    switch (slug.length) {
        case 1:
            detected = sperateDemandCategory(slug[0]);
            demand = detected.demand.slug;
            category = detected.category;
            searchQuery.demand = demand;
            searchQuery.category = category;
            break;
        case 2:
            detected = sperateDemandCategory(slug[1]);
            demand = detected.demand.slug;
            category = detected.category;
            searchQuery.city = slug[0];
            searchQuery.demand = demand;
            break;
        case 3:
            detected = sperateDemandCategory(slug[2]);
            demand = detected.demand.slug;
            category = detected.category;
            searchQuery.city = slug[0];
            searchQuery.district = slug[1];
            searchQuery.demand = demand;
            searchQuery.category = category;
            break;
        default:
            break;
    }
    ;
    delete query.slug;
    for (var index in query) {
        searchQuery[index] = query[index];
    }
    return searchQuery;
};
exports.routeToSearchFilter = routeToSearchFilter;
var filterToSlug = function (searchQuery, key, value) {
    if (value instanceof Object) {
        if (key === 'city' && searchQuery['city'] !== value.slug) {
            searchQuery['district'] = '';
            searchQuery['ward'] = '';
        }
        if (key === 'category' && searchQuery['category'] !== value.slug) {
            searchQuery['specialty'] = '';
        }
        searchQuery[key] = value.slug || value.value;
    }
    else {
        if (key === 'city') {
            searchQuery['district'] = '';
            searchQuery['ward'] = '';
        }
        if (key === 'category') {
            searchQuery['specialty'] = '';
        }
        searchQuery[key] = value;
    }
    return searchQuery;
};
exports.filterToSlug = filterToSlug;
var getUrl = function (searchQuery) {
    var demandCategory = searchQuery.category
        ? searchQuery.demand + "-" + searchQuery.category
        : searchQuery.demand;
    var makeSlug = [
        searchQuery.city,
        searchQuery.district,
        demandCategory,
    ];
    var makeParams = [
        { key: 'sort', value: searchQuery.sort },
        { key: 'acreage', value: searchQuery.acreage },
        { key: 'ward', value: searchQuery.ward },
        { key: 'specialty', value: searchQuery.specialty },
        { key: 'price', value: searchQuery.price },
        { key: 'direction', value: searchQuery.direction },
        { key: 'juridical', value: searchQuery.juridical },
        { key: 'bedroom', value: searchQuery.bedroom },
        { key: 'bathroom', value: searchQuery.bathroom },
    ];
    makeSlug = makeSlug.filter(function (res) { return res; });
    makeSlug = makeSlug.join('/');
    makeParams = makeParams.map(function (param) {
        return param.key + "=" + (param.value || '');
    }).join('&');
    return makeSlug + "?" + makeParams;
};
exports.getUrl = getUrl;
var checkViewType = function (slug, query) {
    var viewType = 'list';
    if (slug instanceof Array && slug.length === 1) {
        var url = slug[0];
        viewType = url.split('-').find(function (res) { return res === 'pid'; });
    }
    if (viewType === 'pid') {
        return 'page';
    }
    if ((query === null || query === void 0 ? void 0 : query.map) === 'true') {
        return 'map';
    }
    return 'list';
};
exports.checkViewType = checkViewType;
var getCode = function (path) {
    var part = path.split('pid');
    return part.slice(-1).pop().replace('-', '');
};
exports.getCode = getCode;
var getThumbImageSrc = function (images) {
    if (!images.length) {
        return process.env.NO_IMAGE || '';
    }
    return process.env.STATIC + '/' + images[0];
};
exports.getThumbImageSrc = getThumbImageSrc;
var sperateDemandCategory = function (slug) {
    var temp = slug.split('-');
    var demandData = app_json_1["default"].demandData;
    var word = temp[0] + "-" + temp[1];
    var demand = demandData.find(function (res) { return res.name === word; }) || {};
    delete temp[0];
    delete temp[1];
    temp = temp.filter(function (res) { return res; });
    var category = temp.length ? temp.join('-') : '';
    return { demand: demand, category: category };
};
