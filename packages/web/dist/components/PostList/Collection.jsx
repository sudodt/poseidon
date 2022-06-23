"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PostList_module_scss_1 = require("./PostList.module.scss");
var location_1 = require("@/utils/location");
var bi_1 = require("react-icons/bi");
var cg_1 = require("react-icons/cg");
var price_1 = require("@/utils/price");
var user_1 = require("@/utils/user");
var post_1 = require("@/utils/post");
var avatar_1 = require("primereact/avatar");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var react_redux_1 = require("react-redux");
var utils_1 = require("primereact/utils");
var Collection = function (props) {
    var data = props.data;
    var renderCollection = function (data) {
        var items = [];
        data.forEach(function (element) {
            items.push(itemTemplate(element));
        });
        return items;
    };
    var itemTemplate = function (item) {
        var user = function (user) {
            return (<span className={PostList_module_scss_1["default"].user}>
                    <avatar_1.Avatar image={user_1.getUserAvatar(item.user.profile)} shape="circle" className="p-mr-2"/>
                    <span>
                        {item.user.name}
                    </span>
                </span>);
        };
        var getPriceString = function (item) {
            var _a;
            if (!item) {
                return '';
            }
            if (((_a = item === null || item === void 0 ? void 0 : item.demand) === null || _a === void 0 ? void 0 : _a.slug) == 'cho-thue') {
                return price_1.priceText(item.price) + "/" + item.price_unit;
            }
            return price_1.priceText(item.price);
        };
        var renderAttributes = function () {
            return (<>
                    {!props.isMobile ?
                    <>
                                <div className="p-mr-3">
                                    {item.category.slug == "dat"
                            ? <><cg_1.CgArrowsHAlt size={16}/> <span className={"p-pl-2"}>{item.front || 0}m</span></>
                            : <><bi_1.BiBed size={20}/> <span className={"p-pl-2"}>{item.bedroom || 0}</span></>}
                                </div>
                                <div className="p-mr-3">
                                    {item.category.slug == "dat"
                            ? <><cg_1.CgArrowsVAlt size={16}/> <span className={"p-pl-2"}>{item.footage || 0}m</span></>
                            : <><bi_1.BiBath size={20}/> <span className={"p-pl-2"}>{item.bathroom || 0}</span></>}
                                </div>
                            </> : ""}</>);
        };
        return (<div className={PostList_module_scss_1["default"].wrapper}>
                <div className={PostList_module_scss_1["default"].item}>
                    <div className={PostList_module_scss_1["default"].itemLeft}>
                        <div className={PostList_module_scss_1["default"].imageWrapper}>
                            <a href={"/" + item.slug + "-pid-" + item.uuid}>
                                <react_lazy_load_image_component_1.LazyLoadImage alt={item.title} className={PostList_module_scss_1["default"].image} src={post_1.getThumbImageSrc(item.images)} effect="opacity" width={'100%'} height={"auto"}/>
                            </a>
                            <span className={PostList_module_scss_1["default"].imageCounter}>
                                <i className="pi pi-images"/>
                                <span>{item.images.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className={PostList_module_scss_1["default"].itemRight}>
                        <div className={PostList_module_scss_1["default"].contentWrapper}>
                            <a href={"/" + item.slug + "-pid-" + item.uuid}>
                                <div className={'p-grid'}>
                                    <div className={'p-col-12'}>
                                        <h2 className={PostList_module_scss_1["default"].title}>{item.title}</h2>
                                    </div>
                                    <div className={'p-col-12'}>
                                        <div className={PostList_module_scss_1["default"].address}>
                                            <i className="pi pi-map-marker p-pr-1"></i>{location_1.getAddressString(item, true, props.isMobile)}
                                        </div>
                                    </div>
                                    <div className={'p-col-12'}>
                                        <div className={"p-d-flex " + PostList_module_scss_1["default"].itemList}>
                                            <div className={utils_1.classNames({
                "p-mr-3": !props.isMobile
            })}>
                                                <bi_1.BiShapeSquare size={20}/> <span className={"p-pl-2"}>{item.acreage} m2</span>
                                            </div>
                                            {renderAttributes()}
                                            {props.isMobile ?
                <>
                                                        <div className={'p-md-4'}>
                                                            <span>
                                                                {item.created_at}
                                                            </span>
                                                        </div>
                                                    </> : ""}

                                        </div>
                                    </div>

                                    <div className={'p-col-12'}>
                                        <div className={"p-grid " + PostList_module_scss_1["default"].itemList}>
                                            <div className={"p-md-4 " + PostList_module_scss_1["default"].price}>
                                                <span className={'p-pl-2'}>{getPriceString(item)}</span>
                                            </div>
                                            <div className={'p-md-4'}>
                                                {user(item.user)}
                                            </div>
                                            {!props.isMobile ?
                <>
                                                        <div className={'p-md-4'}>
                                                            <span>
                                                                {item.created_at}
                                                            </span>
                                                        </div>
                                                    </> : ""}

                                        </div>
                                    </div>

                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>);
    };
    return (<div className={PostList_module_scss_1["default"].postCollectionWrapper}>
            {renderCollection(data)}
        </div>);
};
var mapStateToProps = function (_a) {
    var config = _a.config;
    return ({
        isMobile: config.isMobile || false
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Collection);
