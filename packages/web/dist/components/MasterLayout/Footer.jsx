"use strict";
exports.__esModule = true;
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var link_1 = require("next/link");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var Footer = function () {
    var d = new Date();
    return (<div className={MasterLayout_module_scss_1["default"].FooterWrapper}>
            <div className={MasterLayout_module_scss_1["default"].aboutWrapper}>
                <div className="container">
                    <div className={MasterLayout_module_scss_1["default"].contact}>
                        <div className="p-grid p-fluid">
                            <div className={"p-md-3 p-lg-3 p-col-12 " + MasterLayout_module_scss_1["default"].footerBge}>
                                <small>Quảng cáo đặt tại đây</small>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Bất động sản TP Hồ Chí Minh</b></div>
                                <div><link_1.default href={"/"}><a>Khu vực Quận 1</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Khu vực Quận 2</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Khu vực Quận 7</a></link_1.default></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Bất động sản Hà Nội</b></div>
                                <div><link_1.default href={"/"}><a>Khu vực Quận Cầu Giấy</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Khu vực Quận Đống Đa</a></link_1.default></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Khu vực khác</b></div>
                                <div><link_1.default href={"/"}><a>Khu vực Bình Dương</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Khu vực Đà Nẵng</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Khu vực Đồng Nai</a></link_1.default></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={MasterLayout_module_scss_1["default"].aboutWrapper}>
                <div className="container">
                    <div className={MasterLayout_module_scss_1["default"].contact}>
                        <div className="p-grid p-fluid">
                            <div className={"p-md-3 p-lg-3 p-col-12 " + MasterLayout_module_scss_1["default"].logoWrapper}>
                                <react_lazy_load_image_component_1.LazyLoadImage alt="bdstotnhat.com" src="/images/logo-white.svg" width={'160px'} height={"22px"}/>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Về chúng tôi</b></div>
                                <div><link_1.default href={"/"}><a>Về trang này</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Chính sách bảo mật</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Điều khoản thỏa thuận</a></link_1.default></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Chăm sóc khách hàng</b></div>
                                <div><link_1.default href={"/"}><a>Hướng dẫn đăng kí</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Hướng dẫn đăng tin</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Phản ảnh thành viên</a></link_1.default></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Chính sách dịch vụ</b></div>
                                <div><link_1.default href={"/"}><a>Chương trình khuyến mãi</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Bảng giá dịch vụ</a></link_1.default></div>
                                <div><link_1.default href={"/"}><a>Các hình thức nạp tiền</a></link_1.default></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={MasterLayout_module_scss_1["default"].footer}>
                <div className="container">
                    <hr />
                    <div className={MasterLayout_module_scss_1["default"].footerContent}>
                        <span>
                            {"\u00A9 " + d.getFullYear() + " - B\u1EA3n quy\u1EC1n thu\u1ED9c v\u1EC1 Bdstotnhat.com"}
                        </span>
                    </div>
                </div>
            </div>
        </div>);
};
exports["default"] = Footer;
