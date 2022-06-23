"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var Search_1 = require("./Search");
var Bottom_1 = require("./Bottom");
var Menu_1 = require("./Menu");
var useScrollData_1 = require("@/utils/hooks/useScrollData");
var utils_1 = require("primereact/utils");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var react_redux_1 = require("react-redux");
var MyHeader = function (props) {
    var _a = react_1.useState(false), mounted = _a[0], setMounted = _a[1];
    var position = useScrollData_1.useScrollData().position;
    react_1.useEffect(function () { return setMounted(true); }, []);
    if (!mounted)
        return null;
    return (<>
      <div className={utils_1.classNames(MasterLayout_module_scss_1["default"].header, position.y !== 0 && props.isMobile ? MasterLayout_module_scss_1["default"].smallHeader : '')}>
        <div className={"container"}>
          <div className="p-grid p-fluid">
            <div className={"p-col-12 p-md-2 p-lg-2 p-pb-0"}>
              <div className={utils_1.classNames(MasterLayout_module_scss_1["default"].logo, position.y !== 0 ? MasterLayout_module_scss_1["default"].hidelogo : '')}>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href='/'>
                    <react_lazy_load_image_component_1.LazyLoadImage alt="bdstotnhat.com" src="/images/logo.svg" width={'160px'} height={"22px"}/>
                  </a>
              </div>
            </div>
            <div className="p-col-12 p-md-4 p-lg-4  p-pb-0">
              <div className={MasterLayout_module_scss_1["default"].search}>
                <Search_1.default />
              </div>
            </div>
            <div className={"p-col-12 p-md-6 p-lg-6  p-pb-0"}>
              <Menu_1.default />
            </div>
          </div>
        </div>
      </div>
      {props.isMobile ? <Bottom_1.default /> : ""}
    </>);
};
var mapStateToProps = function (_a) {
    var config = _a.config;
    return ({
        isMobile: config.isMobile
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(MyHeader);
