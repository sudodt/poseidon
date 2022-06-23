"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Categoies_module_scss_1 = require("./Categoies.module.scss");
var swiper_1 = require("swiper");
var react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");
require("swiper/css/scrollbar");
var react_redux_1 = require("react-redux");
var Categoies = function (props) {
    var renderElement = function () {
        var items = [];
        var limit = 8;
        props.cities.forEach(function (res, key) {
            if (res.image) {
                items.push(itemTeamplate(res));
            }
            if (key >= limit)
                return;
        });
        return items;
    };
    var itemTeamplate = function (item) {
        return (<react_2.SwiperSlide>
        <div className={Categoies_module_scss_1["default"].item}>
          <a href={item.slug + "/mua-ban/"}>
            <div className={Categoies_module_scss_1["default"].itemImage} style={{ backgroundImage: "url(" + item.image + ")" }}/>
            <div className={Categoies_module_scss_1["default"].imageOverlay}/>
            <div className={Categoies_module_scss_1["default"].caption}>
              <h3>
                {item.full_name}
              </h3>
              <span>
                0 tin đăng
              </span>
            </div>
          </a>
        </div>  
      </react_2.SwiperSlide>);
    };
    return (<div className={Categoies_module_scss_1["default"].wrapper}>
      <div className="container">
        <div className={Categoies_module_scss_1["default"].header}>
          <h2>Khám phá nhanh khu vực</h2>
        </div>
        <div className={Categoies_module_scss_1["default"].slider}>
        <react_2.Swiper className={Categoies_module_scss_1["default"].swiper} modules={[swiper_1.Scrollbar, swiper_1.Navigation, swiper_1.A11y]} navigation spaceBetween={40} slidesPerView={5} breakpoints={{
            320: {
                slidesPerView: 1.5
            },
            640: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 3.5
            },
            1024: {
                slidesPerView: 5
            }
        }}>
          {renderElement()}

        </react_2.Swiper>
        </div>
      </div>
    </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations;
    return ({
        cities: locations.cities || []
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Categoies);
