"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var store_1 = require("@/redux/store");
var userCollectionAction_1 = require("@/redux/actions/userCollectionAction");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var Master_1 = require("@/src/components/MasterLayout/Master");
var router_1 = require("next/router");
var next_seo_1 = require("next-seo");
var UserList_module_scss_1 = require("@/components/UserList/UserList.module.scss");
var Breadcrumb_1 = require("@/components/UserList/Breadcrumb");
var Filter_1 = require("@/components/UserList/Filter");
var Collection_1 = require("@/components/UserList/Collection");
var Right_1 = require("@/components/UserList/Right");
var View = function (props) {
    var router = router_1.useRouter();
    var d = new Date();
    var userCollection = props.userCollection;
    var search = userCollection.search;
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    return (<Master_1.default>
            <next_seo_1.NextSeo title={"Danh s\u00E1ch m\u00F4i gi\u1EDBi m\u1EDBi nh\u1EA5t th\u00E1ng " + month + " " + year} description={"Danh s\u00E1ch m\u00F4i gi\u1EDBi m\u1EDBi nh\u1EA5t th\u00E1ng " + month + " " + year} openGraph={{
            url: 'https://bdstotnhat.com' + router.asPath,
            title: "Danh s\u00E1ch m\u00F4i gi\u1EDBi m\u1EDBi nh\u1EA5t th\u00E1ng " + month + " " + year + "}",
            description: "Danh s\u00E1ch m\u00F4i gi\u1EDBi m\u1EDBi nh\u1EA5t th\u00E1ng " + month + " " + year + "}",
            images: [
                {
                    url: 'https://bdstotnhat.com/_next/image?url=%2Fimages%2Flogo.svg&w=384&q=100'
                }
            ],
            site_name: 'bdstotnhat.com'
        }}/>
            <Filter_1.default />
            <Breadcrumb_1.default />
            <div className={UserList_module_scss_1["default"].container}>
                <div className="container">
                    <div className={"p-grid"}>
                        <div className="p-col-12 p-md-9 p-lg-9">
                            <div className={"p-pt-2 p-pb-2"}>
                                <h2 className={UserList_module_scss_1["default"].metaTitle}>{"Danh s\u00E1ch m\u00F4i gi\u1EDBi \u0111ang ho\u1EA1t \u0111\u1ED9ng th\u00E1ng " + month + " " + year}</h2>
                                <span>Tìm thấy {search.meta.total} môi giới đang hoạt động</span>
                            </div>
                            <div className="post--wrapper">
                                <Collection_1.default data={search.data}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-lg-3">
                            <Right_1.default />
                        </div>
                    </div>
                </div>
            </div>
        </Master_1.default>);
};
exports.getServerSideProps = store_1.wrapper.getServerSideProps(function (context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.store.dispatch(locationsAction_1.fetchLocationsRequest({ isServer: true, type: locationsReducer_1.FETCH_CITIES, parent_id: null }))];
            case 1:
                _a.sent();
                return [4 /*yield*/, context.store.dispatch(userCollectionAction_1.fetchUsersRequest({
                        isServer: true,
                        data: context.query
                    }))];
            case 2:
                _a.sent();
                return [2 /*return*/, {
                        props: context.store.getState()
                    }];
        }
    });
}); });
exports["default"] = View;
