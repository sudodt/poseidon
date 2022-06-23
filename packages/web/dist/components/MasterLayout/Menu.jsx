"use strict";
exports.__esModule = true;
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var button_1 = require("primereact/button");
var ripple_1 = require("primereact/ripple");
var universal_cookie_1 = require("universal-cookie");
var misc_1 = require("@/utils/misc");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var accountsAction_1 = require("@/redux/actions/accountsAction");
var router_1 = require("next/router");
var UserMenu_1 = require("./UserMenu");
var Menu = function (props) {
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var account = props.account || false;
    var config = props.config;
    var listMenu = [
        {
            label: "Mua bán",
            url: "/mua-ban"
        },
        {
            label: "Cho thuê",
            url: "/cho-thue"
        },
        {
            label: "Môi giới",
            url: "/tim-moi-gioi"
        },
        {
            label: "Đăng tin",
            icon: "pi pi-pencil",
            url: "/dang-tin"
        },
    ];
    if (!token) {
        listMenu = misc_1.insert(listMenu, 3, {
            label: "Đăng nhập",
            url: "/auth/login"
        });
    }
    else {
        listMenu = misc_1.insert(listMenu, 3, {
            label: account.name,
            url: "/accounts"
        });
    }
    var renderItems = function () {
        var items = [];
        listMenu.forEach(function (res) {
            if (res.url === "/accounts") {
                items.push(<UserMenu_1.default user={res}/>);
            }
            else
                items.push(<li>
          {res.icon ? (<button_1.Button {...res} className="p-button-outlined p-ripple" onClick={function (e) { router_1["default"].push("/" + res.url); }}>
              <ripple_1.Ripple />
            </button_1.Button>) : (<a href={res.url}>
              {res.icon && <i className={"" + res.icon}/>}
              {res.label}
            </a>)}
        </li>);
        });
        return items;
    };
    return (<div className={MasterLayout_module_scss_1["default"].menu + " " + (config.mobileMenuEnabled && MasterLayout_module_scss_1["default"].menuOpen)}>
      <ul className={MasterLayout_module_scss_1["default"].menuList}>
        {renderItems()}
      </ul>
    </div>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAccountRequest: redux_1.bindActionCreators(accountsAction_1.fetchAccountRequest, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var accounts = _a.accounts, config = _a.config;
    return ({
        account: accounts.account,
        config: config
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Menu);
