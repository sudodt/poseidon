"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var inputtext_1 = require("primereact/inputtext");
var AccountProfile_module_scss_1 = require("./AccountProfile.module.scss");
var button_1 = require("primereact/button");
var router_1 = require("next/router");
var Phone = function (props) {
    var account = props.account;
    var router = router_1.useRouter();
    var onRedirect = function () {
        router.push('/accounts/onboarding?countinue=/accounts');
    };
    return (<react_1["default"].Fragment>
            <div className={"p-field " + AccountProfile_module_scss_1["default"].field}>
                <label htmlFor="name" className="p-d-block">Số điện thoại</label>
                <inputtext_1.InputText readOnly={!props.editMode ? true : false} value={account.phone}/>
                <button_1.Button label="Cập nhật" onClick={onRedirect} icon="pi pi-pencil" className={"p-button-text " + AccountProfile_module_scss_1["default"].rightButton}/>
            </div>
        </react_1["default"].Fragment>);
};
exports["default"] = react_redux_1.connect(null, null)(Phone);
