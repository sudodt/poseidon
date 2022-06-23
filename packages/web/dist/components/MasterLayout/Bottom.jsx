"use strict";
exports.__esModule = true;
var miscAction_1 = require("@/src/redux/actions/miscAction");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var Bottom_module_scss_1 = require("./Bottom.module.scss");
var useDebounce_1 = require("@/utils/hooks/useDebounce");
var Bottom = function (props) {
    var config = props.config;
    var _a = react_1.useState(config.mobileMenuEnabled), openMenu = _a[0], setOpenMenu = _a[1];
    var debounceOpenMenu = useDebounce_1.useDebounce(openMenu);
    var toggleMobileMenu = function (e) {
        setOpenMenu(!config.mobileMenuEnabled);
    };
    react_1.useEffect(function () { props.toggleMobileMenu(openMenu); }, [debounceOpenMenu]);
    return (<react_1["default"].Fragment>
            <div className={Bottom_module_scss_1["default"].listWrraper}>
                <ul className={Bottom_module_scss_1["default"].list}>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={Bottom_module_scss_1["default"].link} href="/">
                                <div className="pi pi-home"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Trang chủ</div>
                            </a>
                        </div>
                    </li>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={Bottom_module_scss_1["default"].link} href="/dang-tin">
                            <div className="pi pi-pencil"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Đăng tin</div>
                            </a>
                        </div>
                    </li>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={Bottom_module_scss_1["default"].link} href="/accounts/posts">
                            <div className="pi pi-user"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Quản lý tin</div>
                            </a>
                        </div>
                    </li>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item + " " + (config.mobileMenuEnabled && Bottom_module_scss_1["default"].itemActive)}>
                            <a className={Bottom_module_scss_1["default"].link} onClick={toggleMobileMenu}>
                                <div className="pi pi-ellipsis-h"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Thêm</div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </react_1["default"].Fragment>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleMobileMenu: redux_1.bindActionCreators(miscAction_1.toggleMobileMenu, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var config = _a.config;
    return ({
        config: config || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Bottom);
