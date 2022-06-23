"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PostCarousel_module_scss_1 = require("./PostCarousel.module.scss");
var location_1 = require("@/utils/location");
var price_1 = require("@/utils/price");
var user_1 = require("@/utils/user");
var post_1 = require("@/utils/post");
var avatar_1 = require("primereact/avatar");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var swiper_1 = require("swiper");
var react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/scrollbar");
var bi_1 = require("react-icons/bi");
var PostCarousel = function (props) {
    var _a;
    var renderElement = function () {
        var items = [];
        props.data.forEach(function (res, key) {
            items.push(itemTeamplate(res));
        });
        return items;
    };
    var itemTeamplate = function (item) {
        return (<react_2.SwiperSlide>
      <div className={PostCarousel_module_scss_1["default"].item}>
        <div className="p-shadow-3 p-br-3">
          <a href={item.slug + "-pid-" + item.uuid}>
            <div className={PostCarousel_module_scss_1["default"].imageWrapper}>
              <react_lazy_load_image_component_1.LazyLoadImage alt={item.title} className={PostCarousel_module_scss_1["default"].image} src={post_1.getThumbImageSrc(item.images)} effect="opacity" width={'100%'} height={"auto"}/>
              <span className={PostCarousel_module_scss_1["default"].imageCounter}>
                <i className="pi pi-images"/>
                <span>{item.images.length}</span>
              </span>
            </div>
          </a>
          <div className={PostCarousel_module_scss_1["default"].content}>
            <a href={item.slug + "-pid-" + item.uuid}>
              <h3 className={PostCarousel_module_scss_1["default"].title}>{item.title}</h3>
            </a>
            <div className={PostCarousel_module_scss_1["default"].address}>
              <i className="pi pi-map-marker p-pr-1"></i>
              {location_1.getAddressString(item, true)}</div>
          </div>
          <div className={PostCarousel_module_scss_1["default"].sperate}/>
          <div className={PostCarousel_module_scss_1["default"].moreInfo}>
            <div className={PostCarousel_module_scss_1["default"].price}>
              <span>{price_1.priceText(item.price)}</span>
            </div>
            <div className={PostCarousel_module_scss_1["default"].moreInRight}>
              <bi_1.BiShapeSquare size={20}/> <span>{item.acreage} m2</span>
            </div>
          </div>
          <div className={PostCarousel_module_scss_1["default"].sperate}/>
          <div className={PostCarousel_module_scss_1["default"].moreInfo}>
            <div className={PostCarousel_module_scss_1["default"].userInfo}>
              <span>
                <avatar_1.Avatar image={user_1.getUserAvatar(item.user.profile)} shape="circle" className="p-mr-2"/>
                {item.user.name}
              </span>
            </div>
            <div className={PostCarousel_module_scss_1["default"].moreInRight}>
              <span>{item.created_at}</span>
            </div>
          </div>
        </div>

      </div>
      </react_2.SwiperSlide>);
    };
    return (<div className={PostCarousel_module_scss_1["default"].wrapper}>
      <div className="container">
        <div className={PostCarousel_module_scss_1["default"].header}>
          <h2>{props.header}</h2>
        </div>
        <div className={PostCarousel_module_scss_1["default"].slider}>
        <react_2.Swiper className={PostCarousel_module_scss_1["default"].swiper} modules={[swiper_1.Scrollbar, swiper_1.Navigation, swiper_1.A11y]} navigation spaceBetween={20} slidesPerView={4} breakpoints={{
            320: {
                slidesPerView: 1.5
            },
            640: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 2.5
            },
            1024: {
                slidesPerView: 4
            }
        }}>
          {renderElement()}

        </react_2.Swiper>
        </div>
        {props.more &&
            <div className="w-100 p-d-flex p-ai-center p-jc-center">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href={"/" + ((_a = props === null || props === void 0 ? void 0 : props.demand) === null || _a === void 0 ? void 0 : _a.slug)} className={PostCarousel_module_scss_1["default"].link}>
              Xem thêm các tin đăng {props.header} khác
            </a>
          </div>}
      </div>
    </div>);
};
exports["default"] = PostCarousel;
