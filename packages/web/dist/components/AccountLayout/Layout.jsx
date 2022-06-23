"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AccountLayout_module_scss_1 = require("./AccountLayout.module.scss");
var Menu_1 = require("./Menu");
var router_1 = require("next/router");
var AccountLayout = function (props) {
    var router = router_1.useRouter();
    return (<react_1["default"].Fragment>
            <div className={AccountLayout_module_scss_1["default"].wrapper}>
                <div className="container">
                    <div className="p-grid">
                        <div className="p-col-12 p-md-3 p-lg-3">
                            <Menu_1.default />
                        </div>
                        <div className={props.contentClass}>
                            {props.children}    
                        </div>
                    </div>
                </div>
            </div>
        </react_1["default"].Fragment>);
};
exports["default"] = AccountLayout;
