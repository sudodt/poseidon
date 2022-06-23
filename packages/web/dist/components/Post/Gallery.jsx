"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var simple_react_lightbox_1 = require("simple-react-lightbox");
var simple_react_lightbox_2 = require("simple-react-lightbox");
var swiper_1 = require("swiper");
var react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");
require("swiper/css/scrollbar");
;
var Slider = function (props) {
    var _a;
    var _b = simple_react_lightbox_2.useLightbox(), openLightbox = _b.openLightbox, closeLightbox = _b.closeLightbox;
    var user = props.user || {};
    var options = {
        settings: {},
        buttons: {
            showDownloadButton: false
        }
    };
    var itemTemplate = function (item, index) {
        return (<react_2.SwiperSlide className={Post_module_scss_1["default"].item}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={props.title} src={process.env.STATIC + '/' + item} width={100} onClick={function () { openLightbox(index); }}/>
            </react_2.SwiperSlide>);
    };
    var renderItems = function (data) {
        var items = [];
        data.forEach(function (element, index) {
            items.push(itemTemplate(element, index));
        });
        return items;
    };
    return (<react_1["default"].Fragment>
            <simple_react_lightbox_1.default>
                <simple_react_lightbox_2.SRLWrapper options={options}>
                    <react_2.Swiper className={Post_module_scss_1["default"].swiper} modules={[swiper_1.Pagination, swiper_1.Scrollbar, swiper_1.A11y, swiper_1.Navigation]} spaceBetween={0} navigation pagination={{ clickable: true }}>
                        {renderItems(props.data)}
                    </react_2.Swiper>
                    <div className={Post_module_scss_1["default"].labelMoreInfo}>
                        <span>Tin {(_a = user === null || user === void 0 ? void 0 : user.type) === null || _a === void 0 ? void 0 : _a.display} đăng {user === null || user === void 0 ? void 0 : user.created_at}</span>
                    </div>
                </simple_react_lightbox_2.SRLWrapper>
            </simple_react_lightbox_1.default>
        </react_1["default"].Fragment>);
};
exports["default"] = Slider;
