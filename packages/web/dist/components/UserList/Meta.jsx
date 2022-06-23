"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UserList_module_scss_1 = require("./UserList.module.scss");
var Meta = function (props) {
    var meta = props.meta || {};
    var seo = props.seo || {};
    var d = new Date();
    return (<>
            <div className={"p-pt-2 p-pb-2"}>
                <h2 className={UserList_module_scss_1["default"].metaTitle}>Danh sách môi giới tháng {d.getMonth() + 1} {d.getFullYear()}</h2>
                <span>Tìm thấy {meta.total} môi giới đang hoạt động</span>
            </div>
        </>);
};
exports["default"] = Meta;
