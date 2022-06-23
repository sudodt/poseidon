"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var react_1 = require("react");
var checkbox_1 = require("primereact/checkbox");
var MiscCheckbox = function (props) {
    var options = props.options || [];
    var _a = react_1.useState([]), checked = _a[0], setChecked = _a[1];
    var onChange = function (e) {
        var selected = __spreadArray([], checked);
        if (e.checked)
            selected.push(e.value);
        else
            selected.splice(selected.indexOf(e.value), 1);
        setChecked(selected);
        props.onChange(selected);
    };
    var optionTemplate = function (item) {
        return (<div className="p-col-6">
                <checkbox_1.Checkbox inputId={props.name + "_" + item.id} onChange={onChange} checked={checked.includes(item.id)} value={item.id}/>
                <label htmlFor={props.name + "_" + item.id} className="p-checkbox-label p-pl-2">{item.name}</label>
            </div>);
    };
    var renderOptions = function () {
        var Jsx = [];
        options.forEach(function (item) {
            Jsx.push(optionTemplate(item));
        });
        return Jsx;
    };
    return (<>
            <h4>{props.title}</h4>

            <div className="p-grid">
                {renderOptions()}
            </div>
        </>);
};
exports["default"] = MiscCheckbox;
