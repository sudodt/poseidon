"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var PostList_module_scss_1 = require("./PostList.module.scss");
var react_redux_1 = require("react-redux");
var app_json_1 = require("../../config/app.json");
var Right = function (props) {
    var query = props.query || {};
    var demand = app_json_1["default"].demandData.find(function (res) { return res.slug === query.demand; }) || {};
    var header = function (string) {
        return (<div className={PostList_module_scss_1["default"].headerWrapper}>
                <h4 className={PostList_module_scss_1["default"].header}>{string}</h4>
            </div>);
    };
    var content = function (data, limit, type) {
        if (limit === void 0) { limit = 10; }
        var jsx = [];
        data.every(function (res, index) {
            if (type === 'category') {
                jsx.push(itemCategoryTemplate(res));
            }
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
        return (<li className={PostList_module_scss_1["default"].rightItem}>
                <link_1.default href={"/" + demand.slug + "-" + item.slug}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2"/>{item.name}
                    </a>
                </link_1.default>
            </li>);
    };
    var itemCityTemplate = function (item) {
        return (<li className={PostList_module_scss_1["default"].rightItem}>
                <link_1.default href={"/" + item.slug + "/" + demand.slug}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2"/>{item.name}
                    </a>
                </link_1.default>
            </li>);
    };
    return (<div className={PostList_module_scss_1["default"].rightContainer}>
            <div className={"p-shadow-2 " + PostList_module_scss_1["default"].rightCard}>
                {header('Loại Bất động sản')}
                <ul className={PostList_module_scss_1["default"].contentWrapper}>
                    {content(props.categories, 10, 'category')}
                </ul>
            </div>
            <div className={"p-shadow-2 p-mt-2 " + PostList_module_scss_1["default"].rightCard}>
                {header('Bất động sản theo khu vực')}
                <ul className={PostList_module_scss_1["default"].contentWrapper}>
                    {content(props.cities, 15, 'city')}
                </ul>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postsAttributes = _a.postsAttributes, postCollection = _a.postCollection;
    return ({
        cities: locations.cities || [],
        categories: postsAttributes.categories,
        query: postCollection.query
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Right);
