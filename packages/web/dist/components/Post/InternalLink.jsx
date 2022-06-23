"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var react_redux_1 = require("react-redux");
var InternalLink = function (props) {
    var data = props.data;
    var demand = data.demand || {};
    var category = data.category || {};
    var city = data.city || {};
    var district = data.district || {};
    var list = [
        {
            'url': demand.slug + "-" + category.slug,
            'label': demand.name + " " + category.name
        },
        {
            'url': city.slug + "/" + demand.slug + "-" + category.slug,
            'label': category.name + " khu v\u1EF1c " + city.name
        },
        {
            'url': city.slug + "/" + district.slug + "/" + demand.slug + "-" + category.slug,
            'label': category.name + " khu v\u1EF1c " + district.name + ", " + city.name
        },
    ];
    var itemTemplate = function (item) {
        return (<a className={Post_module_scss_1["default"].urlRecommendTag} href={item.url}>
                {item.label}
            </a>);
    };
    var renderElement = function () {
        var items = [];
        list.forEach(function (res, key) {
            items.push(itemTemplate(res));
        });
        return items;
    };
    return (<div className={Post_module_scss_1["default"].urlRecommendwrapper}>
            <div className={Post_module_scss_1["default"].urlRecommendTitle}>
                <span>Có thể bạn quan tâm</span>
            </div>
            <div>
                {renderElement()}
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var post = _a.post;
    return ({
        data: post.data || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(InternalLink);
