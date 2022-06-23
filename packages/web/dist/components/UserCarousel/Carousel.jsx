"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var UserCarousel_module_scss_1 = require("./UserCarousel.module.scss");
var user_1 = require("@/utils/user");
var User_1 = require("@/services/User");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var swiper_1 = require("swiper");
var react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/scrollbar");
var UserCarousel = function (props) {
    var _a = react_1.useState([]), collection = _a[0], setCollection = _a[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var usersCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1["default"].fetch({ "sort": "id-2" })];
                    case 1:
                        usersCollection = _a.sent();
                        return [2 /*return*/, setCollection(usersCollection.data)];
                }
            });
        }); };
        fetchData();
    }, []);
    var renderElement = function () {
        var items = [];
        collection.forEach(function (res) {
            items.push(itemTeamplate(res));
        });
        return items;
    };
    var itemTeamplate = function (item) {
        return (<react_2.SwiperSlide>
      <div className={UserCarousel_module_scss_1["default"].item}>
        <div className={UserCarousel_module_scss_1["default"].itemContainer}>
          <a href={"/me/" + item.slug + "-uid-" + item.uuid}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <react_lazy_load_image_component_1.LazyLoadImage className={UserCarousel_module_scss_1["default"].image} alt={item.name} src={user_1.getUserAvatar(item.profile)} effect="opacity" width="120px" height="120px"/>
            <div>{item.name}</div>
          </a>
        </div>
      </div>
      </react_2.SwiperSlide>);
    };
    return (<div className={UserCarousel_module_scss_1["default"].wrapper}>
      <div className="container">
        <div className={UserCarousel_module_scss_1["default"].header}>
          <h2>{props.header}</h2>
        </div>
        <div className={UserCarousel_module_scss_1["default"].slider}>
        <react_2.Swiper className={UserCarousel_module_scss_1["default"].swiper} modules={[swiper_1.Scrollbar, swiper_1.Navigation, swiper_1.A11y]} navigation spaceBetween={20} slidesPerView={4} breakpoints={{
            320: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 3.5
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
exports["default"] = UserCarousel;
