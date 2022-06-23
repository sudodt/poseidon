"use strict";
exports.__esModule = true;
var react_1 = require("react");
var menu_1 = require("primereact/menu");
var AccountLayout_module_scss_1 = require("./AccountLayout.module.scss");
var router_1 = require("next/router");
var AccountMenu = function () {
    var menu = react_1.useRef(null);
    var toast = react_1.useRef(null);
    var router = router_1.useRouter();
    var items = [
        {
            label: 'Cá nhân',
            items: [
                {
                    label: 'Thay đổi thông tin',
                    command: function () {
                        router.push('/accounts');
                    }
                },
                {
                    label: 'Đổi mật khẩu',
                    command: function () {
                        router.push('/accounts/change-password');
                    }
                }
            ]
        },
        {
            label: 'Tin đăng',
            items: [
                {
                    label: 'Quản lý tin đăng',
                    command: function () {
                        router.push('/accounts/posts');
                    }
                },
                {
                    label: 'Đăng tin mới',
                    command: function () {
                        router.push('/dang-tin');
                    }
                }
            ]
        },
        {
            label: 'Yêu thích',
            items: [
                {
                    label: 'Tin đăng đã lưu'
                },
                {
                    label: 'Tìm kiếm đã lưu'
                }
            ]
        }
    ];
    return (<menu_1.Menu model={items} className={AccountLayout_module_scss_1["default"].menu}/>);
};
exports["default"] = AccountMenu;
