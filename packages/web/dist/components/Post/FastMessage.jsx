"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var button_1 = require("primereact/button");
var FastMessage = function (props) {
    var data = props.data || {};
    return (<button_1.Button label={"G\u1EEDi tin nh\u1EAFn"} icon={'pi pi-comment'} className={"p-button-outlined " + Post_module_scss_1["default"].button}/>);
};
exports["default"] = FastMessage;
