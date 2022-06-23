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
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var Master_1 = require("@/src/components/MasterLayout/Master");
var Post_module_scss_1 = require("./Post.module.scss");
var react_redux_1 = require("react-redux");
var Breadcrumb_1 = require("./Breadcrumb");
var Gallery_1 = require("./Gallery");
var Body_1 = require("./Body");
var User_1 = require("./User");
var MapView = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("./MapView"); }); }, { ssr: false });
var PostCarousel_1 = require("@/src/components/PostCarousel/PostCarousel");
var router_1 = require("next/router");
var Posts_1 = require("@/services/Posts");
var next_seo_1 = require("next-seo");
var Container = function (props) {
    var data = props.data;
    var router = router_1.useRouter();
    var _a = react_1.useState([]), postCollection = _a[0], setPostCollection = _a[1];
    var metaImage = data.images ? data.images[0] : '';
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var postCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Posts_1["default"].getSuggested(data.uuid)];
                    case 1:
                        postCollection = _a.sent();
                        if (postCollection.data.length) {
                            setPostCollection(postCollection.data);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [data.demand, data.category, data === null || data === void 0 ? void 0 : data.city, data.uuid]);
    return (<Master_1.default>
            <next_seo_1.NextSeo title={data.title} description={data.title} openGraph={{
            url: 'https://bdstotnhat.com' + router.asPath,
            title: "" + data.title,
            description: data.description,
            images: [
                {
                    url: process.env.STATIC + '/' + metaImage
                }
            ],
            site_name: 'bdstotnhat.com'
        }}/>
            <div className={Post_module_scss_1["default"].postWrapper}>
                <Breadcrumb_1.default data={props.data}/>
                <div className={'post--content'}>
                    <div className={'container'}>
                        <div className={'p-grid'}>
                            <div className={'p-col-12 p-lg-8'}>
                                <Gallery_1.default data={data.images} title={data.title} user={data.user}/>
                                <Body_1.default data={data}/>
                                <div className={"p-col-12"}>
                                    <MapView latitude={data.latitude} longitude={data.longitude}/>
                                </div>
                            </div>
                            <div className={'p-col-12 p-lg-4'}>
                                <User_1.default data={data.user}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {postCollection.length ?
            <PostCarousel_1.default header={"B\u1EA5t \u0111\u1ED9ng s\u1EA3n t\u01B0\u01A1ng t\u1EF1"} data={postCollection}/>
            : ''}

            </div>
        </Master_1.default>);
};
var mapStateToProps = function (_a) {
    var post = _a.post;
    return ({
        data: post.data || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Container);
