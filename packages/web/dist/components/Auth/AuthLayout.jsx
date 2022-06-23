"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AuthLayout_module_scss_1 = require("./AuthLayout.module.scss");
var card_1 = require("primereact/card");
var tabview_1 = require("primereact/tabview");
var Login_1 = require("./Login");
var Register_1 = require("./Register");
var AuthLayout = function (props) {
    var _a = react_1.useState(props.active), activeIndex = _a[0], setActiveIndex = _a[1];
    var onTabChange = function (e) {
        var map = ['/auth/login', '/auth/register'];
        setActiveIndex(e.index);
        history.pushState({}, map[e.index], map[e.index]);
    };
    return (<div className={AuthLayout_module_scss_1["default"].wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <card_1.Card className={"p-mt-3"}>

                            <tabview_1.TabView className={AuthLayout_module_scss_1["default"].tabView} activeIndex={activeIndex} onTabChange={onTabChange}>
                                <tabview_1.TabPanel header="Đăng nhập">
                                    <Login_1.default />
                                </tabview_1.TabPanel>
                                <tabview_1.TabPanel header="Đăng kí">
                                    <Register_1.default />
                                </tabview_1.TabPanel>
                            </tabview_1.TabView>
                            
                        </card_1.Card>
                    </div>
                </div>
            </div>
        </div>);
};
exports["default"] = AuthLayout;
