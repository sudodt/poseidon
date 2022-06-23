"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var UserList_module_scss_1 = require("./UserList.module.scss");
var react_redux_1 = require("react-redux");
var app_json_1 = require("../../config/app.json");
var Right = function (props) {
    var prefix = "/tim-moi-gioi";
    var query = props.query || {};
    var demand = app_json_1["default"].demandData.find(function (res) { return res.slug === query.demand; }) || {};
    var header = function (string) {
        return (<div className={UserList_module_scss_1["default"].headerWrapper}>
                <h4 className={UserList_module_scss_1["default"].header}>{string}</h4>
            </div>);
    };
    var content = function (data, limit, type) {
        if (limit === void 0) { limit = 10; }
        var jsx = [];
        data.every(function (res, index) {
            if (type === 'city') {
                jsx.push(itemCityTemplate(res));
            }
            if (index > limit) {
                return false;
            }
            ;
            return true;
        });
        return jsx;
    };
    var itemCategoryTemplate = function (item) {
        return (<li className={UserList_module_scss_1["default"].rightItem}>
                <link_1.default href={"/" + demand.slug + "-" + item.slug}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2"/>{item.name}
                    </a>
                </link_1.default>
            </li>);
    };
    var itemCityTemplate = function (item) {
        return (<li className={UserList_module_scss_1["default"].rightItem}>
                <link_1.default href={prefix + "/" + item.slug}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2"/>{item.name}
                    </a>
                </link_1.default>
            </li>);
    };
    return (<div className={UserList_module_scss_1["default"].rightContainer}>
            <div className={"p-shadow-2 p-mt-2 " + UserList_module_scss_1["default"].rightCard}>
                {header('Môi giới theo khu vực')}
                <ul className={UserList_module_scss_1["default"].contentWrapper}>
                    {content(props.cities, 15, 'city')}
                </ul>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postsAttributes = _a.postsAttributes, userCollection = _a.userCollection;
    return ({
        cities: locations.cities || [],
        categories: postsAttributes.categories,
        query: userCollection.query
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Right);
