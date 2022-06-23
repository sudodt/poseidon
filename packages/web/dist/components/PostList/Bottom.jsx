"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Bottom_module_scss_1 = require("@/components/Layout/Mobile/Bottom.module.scss");
var AdvancedFilter_1 = require("./Filters/AdvancedFilter");
var Bottom = function (props) {
    var search = function () {
        return true;
    };
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
                        <AdvancedFilter_1.default search={search}/>
                    </li>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item}>
                            <a className={Bottom_module_scss_1["default"].link}>
                            <div className="pi pi-sort-alt"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Sắp xếp</div>
                            </a>
                        </div>
                    </li>
                    <li className={Bottom_module_scss_1["default"].itemWrapper}>
                        <div className={Bottom_module_scss_1["default"].item}>
                            <a className={Bottom_module_scss_1["default"].link}>
                            <div className="pi pi-ellipsis-h"/>
                                <div className={Bottom_module_scss_1["default"].linkText}>Thêm</div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </react_1["default"].Fragment>);
};
exports["default"] = Bottom;
