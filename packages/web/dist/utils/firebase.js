"use strict";
exports.__esModule = true;
var app_1 = require("firebase/app");
var config = {
    apiKey: "AIzaSyBtKR1ChaU0Zj7WH5JePNV-DPqV_7ESoe4",
    authDomain: "bdstotnhat-com.firebaseapp.com",
    databaseURL: "https://bdstotnhat-com-default-rtdb.firebaseio.com",
    projectId: "bdstotnhat-com",
    storageBucket: "bdstotnhat-com.appspot.com",
    messagingSenderId: "150645050900",
    appId: "1:150645050900:web:93859adfd81ef7d5eae101",
    measurementId: "G-RHNNF3TYN5"
};
exports["default"] = !app_1.getApps().length ? app_1.initializeApp(config) : app_1.getApp();
