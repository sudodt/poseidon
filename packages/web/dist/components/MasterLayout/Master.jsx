"use strict";
exports.__esModule = true;
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var useMobileDetect_1 = require("@/utils/hooks/useMobileDetect");
var miscAction_1 = require("@/redux/actions/miscAction");
var react_1 = require("react");
var Master = function (props) {
    var currentDevice = useMobileDetect_1["default"]();
    react_1.useEffect(function () {
        props.mobileDetect(currentDevice.isMobile());
    }, []);
    return (<>
      <Header_1.default />
      <div className={MasterLayout_module_scss_1["default"].content}>
        {props.children}
      </div>
      <Footer_1.default />
    </>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        mobileDetect: redux_1.bindActionCreators(miscAction_1.mobileDetect, dispatch)
    };
};
exports["default"] = react_redux_1.connect(null, mapDispatchToProps)(Master);
