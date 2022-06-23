"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Post_module_scss_1 = require("./Post.module.scss");
var checkbox_1 = require("primereact/checkbox");
var Reasons = [
    'Nội dung tin không đúng (giá, diện tích, mô tả, ...)',
    'Địa chỉ của bất động sản không đúng',
    'Ảnh không đúng với thực tế',
    'Không liên lạc được với người bán',
    'Bất động sản đã bán/cho thuê',
    'Tin không có thật',
    'Tin trùng với tin khác'
];
var Share = function () {
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState([]), reasons = _b[0], setReasons = _b[1];
    var onReasonChange = function (e) {
        var selectedReason = __spreadArray([], reasons);
        if (e.checked)
            selectedReason.push(e.value);
        else
            selectedReason.splice(selectedReason.indexOf(e.value), 1);
        setReasons(selectedReason);
    };
    var renderHeader = function () {
        return (<react_1["default"].Fragment>
                <span>
                    <i className={"pi pi-flag p-mr-2"}></i>
                    Báo cáo vi phạm
                </span>
            </react_1["default"].Fragment>);
    };
    var renderFooter = function () {
        return (<div>
                <button_1.Button label="Đóng" icon="pi pi-times" onClick={function () { return setShow(false); }} className="p-button-text"/>
                <button_1.Button label="Gửi báo cáo" icon="pi pi-check" onClick={function () { return setShow(false); }} autoFocus/>
            </div>);
    };
    var renderCheckBox = function () {
        var jsx = [];
        Reasons.forEach(function (res, key) {
            jsx.push(chechBoxTemplate(key, res));
        });
        return jsx;
    };
    var chechBoxTemplate = function (id, text) {
        return (<div className="p-col-12">
            <checkbox_1.Checkbox inputId={"report--reason" + id} value={text} onChange={onReasonChange} checked={reasons.includes(text)}></checkbox_1.Checkbox>
            <label htmlFor={"report--reason" + id} className="p-checkbox-label p-ml-2">{text}</label>
        </div>);
    };
    return (<react_1["default"].Fragment>
            <div className={'p-d-flex'}>
                <button_1.Button icon={'pi pi-flag'} onClick={function (e) { return setShow(true); }} className={"p-button-outlined " + Post_module_scss_1["default"].btnWarning} label={'Báo cáo vi phạm'}/>
            </div>
            <dialog_1.Dialog header={renderHeader()} visible={show} onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }} footer={renderFooter()}>
                <div className={'p-grid'}>
                    {renderCheckBox()}
                </div>
            </dialog_1.Dialog>
        </react_1["default"].Fragment>);
};
exports["default"] = Share;
