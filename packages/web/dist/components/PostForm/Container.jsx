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
var Container_module_scss_1 = require("./Container.module.scss");
var Overview_1 = require("./Overview");
var Detail_1 = require("./Detail");
var Upload_1 = require("./Upload");
var universal_cookie_1 = require("universal-cookie");
var react_hook_form_1 = require("react-hook-form");
var next_seo_1 = require("next-seo");
var ripple_1 = require("primereact/ripple");
var button_1 = require("primereact/button");
var toast_1 = require("primereact/toast");
var app_json_1 = require("../../config/app.json");
var Posts_1 = require("@/services/Posts");
var router_1 = require("next/router");
var Container = function (props) {
    var cookie = new universal_cookie_1["default"]();
    var router = router_1.useRouter();
    var token = cookie.get('USER_TOKEN');
    var methods = react_hook_form_1.useForm({
        defaultValues: {
            "demand_id": app_json_1["default"].demandData[0].id,
            "category_id": false
        }
    });
    var toastRef = react_1.useRef(null);
    var control = methods.control, errors = methods.formState.errors, handleSubmit = methods.handleSubmit, reset = methods.reset, watch = methods.watch, setError = methods.setError;
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var category = watch('category_id');
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    form = new FormData();
                    Object.keys(data).forEach(function (key) {
                        var value = data[key];
                        if (value) {
                            if (key === 'images' || value instanceof Array) {
                                for (var i = 0; i < value.length; i++) {
                                    form.append(key + "[]", value[i]);
                                }
                                return;
                            }
                            if (value instanceof Object) {
                                return form.append(key, value.id);
                            }
                            return form.append(key, value);
                        }
                    });
                    return [4 /*yield*/, Posts_1["default"].create(form, token)
                            .then(function (res) {
                            setLoading(false);
                            if (res.error) {
                                // @ts-ignore
                                toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Thất bại, vui lòng thử lại sau' });
                            }
                            else {
                                // @ts-ignore
                                toastRef.current.show({ severity: 'success', summary: 'Đang chuyển hướng', detail: 'Đăng tin thành công, tin đăng của bạn sẽ được kiểm duyệt trong thời gian sớm nhất' });
                                setTimeout(function () {
                                    router.push('/accounts');
                                }, 3000);
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return (<div className={Container_module_scss_1["default"].container}>
            <next_seo_1.NextSeo title={'Đăng tin nhanh'} description={'Đăng tin nhanh'}/>
            <toast_1.Toast ref={toastRef}/>
            <react_hook_form_1.FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-pt-2">
                        <Overview_1.default />
                    </div>
                    {category
            ?
                <>
                            <div className="p-pt-2">
                                <Detail_1.default />
                            </div>
                            <div className="p-pt-2">
                                <Upload_1.default />
                            </div>
                            <div className="container">
                                <div className="p-col-6 p-offset-3">
                                    <div className="p-d-flex">
                                        <button_1.Button type="submit" loading={loading} label="Hoàn tất" className="p-mt-2 p-ripple">
                                            <ripple_1.Ripple />
                                        </button_1.Button>
                                        <button_1.Button type="button" loading={loading} label="Lưu nháp" className="p-mt-2 p-ml-2 p-ripple p-button-outlined p-button-text">
                                            <ripple_1.Ripple />
                                        </button_1.Button>
                                    </div>

                                </div>
                            </div>
                        </>
            : ""}
                </form>
            </react_hook_form_1.FormProvider>
        </div>);
};
exports["default"] = Container;
