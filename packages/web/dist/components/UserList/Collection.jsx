"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UserList_module_scss_1 = require("./UserList.module.scss");
var user_1 = require("@/utils/user");
var UserPhone_1 = require("@/src/components/Shared/UserPhone");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var location_1 = require("@/utils/location");
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
        var userUrl = "/me/" + item.slug + "-uid-" + item.uuid;
        return (<div className={utils_1.classNames("p-grid p-p-2", UserList_module_scss_1["default"].sperate)}>
                    <div className={"p-lg-8 p-col-12"}>
                        <div className={UserList_module_scss_1["default"].item}>
                            <div className={UserList_module_scss_1["default"].itemLeft}>
                                <a href={userUrl}>
                                    <div className={UserList_module_scss_1["default"].imageWrapper}>
                                        <react_lazy_load_image_component_1.LazyLoadImage alt={item.title} className={UserList_module_scss_1["default"].image} src={user_1.getUserAvatar(item.profile)} effect="opacity" width={'96px'} height={"96px"}/>
                                    </div>
                                </a>
                            </div>
                            <div className={UserList_module_scss_1["default"].itemRight}>
                                <div className="p-grid">
                                    <div className="p-col-12">
                                        <a href={userUrl}>
                                            <div className={'p-grid'}>
                                                <div className={"p-col-12 " + UserList_module_scss_1["default"].child}>
                                                    <h2 className={UserList_module_scss_1["default"].title}>{item.name}</h2>
                                                </div>

                                                <div className={"p-col-12 " + UserList_module_scss_1["default"].child}>
                                                    <div className={UserList_module_scss_1["default"].address}>
                                                        <i className="pi pi-map-marker p-pr-1"></i>
                                                        {item.profile ?
                location_1.getAddressString(item.profile, true)
                : "Không xác định"}
                                                    </div>
                                                    <div>{item.posts_count || 0} tin đăng</div>
                                                    <div>Tham gia {item.created_at}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={utils_1.classNames("p-lg-4 p-col-12", UserList_module_scss_1["default"].rightButton)}>
                        <UserPhone_1.default data={item}/>
                    </div>
                </div>);
    };
    return (<>
            {renderCollection(data)}
        </>);
};
exports["default"] = Collection;
