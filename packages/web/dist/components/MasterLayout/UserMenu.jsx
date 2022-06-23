"use strict";
exports.__esModule = true;
var react_1 = require("react");
var menu_1 = require("primereact/menu");
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var Auth_1 = require("@/src/services/Auth");
var universal_cookie_1 = require("universal-cookie");
var avatar_1 = require("primereact/avatar");
var router_1 = require("next/router");
var url_1 = require("@/utils/url");
var UserMenu = function (_a) {
    var user = _a.user;
    var menu = react_1.useRef(null);
    var router = router_1.useRouter();
    var cookie = new universal_cookie_1["default"]();
    var dataProfile = cookie.get('USER_PROFILE');
    var items = [
        {
            label: 'Lối tắt',
            items: [
                {
                    label: 'Trang cá nhân',
                    icon: 'pi pi-users',
                    command: function () {
                        router.push('/accounts');
                    }
                },
                {
                    label: 'Danh sách tin đăng',
                    icon: 'pi pi-list',
                    command: function () {
                        router.push('/accounts/posts');
                    }
                },
                {
                    label: 'Yêu thích',
                    icon: 'pi pi-heart',
                    command: function () {
                        router.push('/accounts/favorites');
                    }
                },
                {
                    label: 'Đăng xuất',
                    icon: 'pi pi-power-off',
                    command: function (e) {
                        var token = cookie.get('USER_TOKEN');
                        Auth_1["default"].logout(token);
                        cookie.remove('USER_TOKEN');
                        window.location.reload();
                    }
                }
            ]
        }
    ];
    return (<li>
            <menu_1.Menu model={items} popup ref={menu} id="popup_menu"/>
            <a onClick={function (event) { return menu.current.toggle(event); }} className={MasterLayout_module_scss_1["default"].button} aria-controls="popup_menu" aria-haspopup>
                    <avatar_1.Avatar image={url_1.getImageUrl(dataProfile.avatar)} shape="circle"/>
                    <span className={"p-pl-2"}>
                        {dataProfile.name}
                    </span>
            </a>
        </li>);
};
exports["default"] = UserMenu;
