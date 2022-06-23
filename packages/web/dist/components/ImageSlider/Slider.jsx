"use strict";
exports.__esModule = true;
/* eslint-disable @next/next/no-img-element */
var react_1 = require("react");
var Slider_module_scss_1 = require("./Slider.module.scss");
var swiper_1 = require("swiper");
var react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");
require("swiper/css/scrollbar");
var Slider = function (props) {
    return (<react_2.Swiper className={Slider_module_scss_1["default"].swiper} modules={[swiper_1.Pagination, swiper_1.Scrollbar, swiper_1.A11y, swiper_1.Autoplay]} spaceBetween={0} autoplay={{
            delay: 2500,
            disableOnInteraction: false
        }} pagination={{ clickable: true }}>
      <react_2.SwiperSlide className={Slider_module_scss_1["default"].slideItem}>
        <img src="/images/bg.webp" className={Slider_module_scss_1["default"].image}/>
      </react_2.SwiperSlide>
      <react_2.SwiperSlide className={Slider_module_scss_1["default"].slideItem}>
        <img src="/images/bg2.webp" className={Slider_module_scss_1["default"].image}/>
      </react_2.SwiperSlide>

    </react_2.Swiper>);
};
exports["default"] = Slider;
