"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var postsAttributesReducer_1 = require("./postsAttributesReducer");
var locationsReducer_1 = require("./locationsReducer");
var postCollectionReducer_1 = require("./postCollectionReducer");
var postReducer_1 = require("./postReducer");
var metaReducer_1 = require("./metaReducer");
var accountsReducer_1 = require("./accountsReducer");
var userCollectionReducer_1 = require("./userCollectionReducer");
var userReducer_1 = require("./userReducer");
var miscReducer_1 = require("./miscReducer");
var rootReducer = redux_1.combineReducers({
    config: miscReducer_1["default"],
    meta: metaReducer_1["default"],
    postsAttributes: postsAttributesReducer_1["default"],
    locations: locationsReducer_1["default"],
    postCollection: postCollectionReducer_1["default"],
    post: postReducer_1["default"],
    userCollection: userCollectionReducer_1["default"],
    user: userReducer_1["default"],
    accounts: accountsReducer_1["default"]
});
exports["default"] = rootReducer;
