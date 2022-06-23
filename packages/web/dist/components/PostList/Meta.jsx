"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PostList_module_scss_1 = require("./PostList.module.scss");
var Meta = function (props) {
    var meta = props.meta || {};
    var seo = props.seo || {};
    var d = new Date();
    return (<>
            <div className={"p-pt-2 p-pb-2"}>
                <h2 className={PostList_module_scss_1["default"].metaTitle}>{seo.title} mới nhất tháng {d.getMonth() + 1} {d.getFullYear()}</h2>
                <span>Tìm thấy {meta.total} nhà đất đang mua bán</span>
            </div>
        </>);
};
exports["default"] = Meta;
