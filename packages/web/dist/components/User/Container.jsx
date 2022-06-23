"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Master_1 = require("@/src/components/MasterLayout/Master");
var User_module_scss_1 = require("./User.module.scss");
var react_redux_1 = require("react-redux");
var Left_1 = require("./Left");
var Content_1 = require("./Content");
var next_seo_1 = require("next-seo");
var Container = function (props) {
    var _a, _b;
    var data = props.data;
    return (<Master_1.default>
            <next_seo_1.NextSeo title={data.name + " | " + ((_a = data === null || data === void 0 ? void 0 : data.type) === null || _a === void 0 ? void 0 : _a.display) + " | " + process.env.APP_NAME} description={data.name + " | " + ((_b = data === null || data === void 0 ? void 0 : data.type) === null || _b === void 0 ? void 0 : _b.display) + " | " + process.env.APP_NAME}/>
            <div className={User_module_scss_1["default"].userWrapper}>
                <div className={"container"}>
                    <div className={"p-grid"}>
                        <div className={"p-sm-4 p-md-4 p-col-12"}>
                            <Left_1.default />
                        </div>
                        <div className={"p-sm-8 p-md-8 p-col-12"}>
                            <Content_1.default />
                        </div>
                    </div>
                </div>
            </div>
        </Master_1.default>);
};
var mapStateToProps = function (_a) {
    var user = _a.user;
    return ({
        data: user.data || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Container);
