"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var breadcrumb_1 = require("primereact/breadcrumb");
var link_1 = require("next/link");
var useMobileDetect_1 = require("@/utils/hooks/useMobileDetect");
var Breadcrumb = function (props) {
    var data = props.data || {};
    var demand = data.demand || {};
    var category = data.category || {};
    var city = data.city || {};
    var district = data.district || {};
    var currentDevice = useMobileDetect_1["default"]();
    var isMobile = currentDevice.isMobile() || false;
    var items = [];
    items.push({
        label: demand.name + " " + category.name,
        url: "/" + demand.slug + "-" + category.slug
    }, {
        label: "" + city.name,
        url: city.slug + "/" + demand.slug + "-" + category.slug + "/"
    }, {
        label: "" + district.name,
        url: "/" + city.slug + "/" + district.slug + "/" + demand.slug + "-" + category.slug + "/"
    }, {
        label: "" + data.title,
        url: "/" + data.slug + "-pid-" + data.uuid
    });
    var home = { icon: 'pi pi-home', url: '/' };
    return (<div className={Post_module_scss_1["default"].breadcrumbWrapper}>
            <div className={'container'}>
                <div className={Post_module_scss_1["default"].breadcrumb}>
                    <div className={'p-grid'}>
                        <div className={"p-col-12 p-lg-9"}>
                            <breadcrumb_1.BreadCrumb model={items} home={home} className={Post_module_scss_1["default"].breadcrumbContainer}/>
                        </div>
                        <div className={"p-col-12 p-lg-3 " + Post_module_scss_1["default"].routeWrapper}>
                            <div className={Post_module_scss_1["default"].route}>
                                <link_1.default href={'/'}>
                                    <a className={Post_module_scss_1["default"].back}>
                                        Về danh sách
                                    </a>
                                </link_1.default>
                                <link_1.default href={'/'}>
                                    <a className={Post_module_scss_1["default"].next}>
                                        Tin kế
                                    </a>
                                </link_1.default>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports["default"] = Breadcrumb;
