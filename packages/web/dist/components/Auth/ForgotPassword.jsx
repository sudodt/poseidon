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
var AuthLayout_module_scss_1 = require("./AuthLayout.module.scss");
var card_1 = require("primereact/card");
var tabview_1 = require("primereact/tabview");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var inputtext_1 = require("primereact/inputtext");
var utils_1 = require("primereact/utils");
var button_1 = require("primereact/button");
var ripple_1 = require("primereact/ripple");
var Auth_1 = require("@/services/Auth");
var ForgotPassword = function (props) {
    var router = router_1.useRouter();
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var defaultValues = {
        email: ''
    };
    var _b = react_hook_form_1.useForm({ defaultValues: defaultValues }), control = _b.control, errors = _b.formState.errors, handleSubmit = _b.handleSubmit, reset = _b.reset;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var result, errors_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, Auth_1["default"].forgotPassword(data)];
                case 1:
                    result = _a.sent();
                    setLoading(false);
                    if (!result.data.error) {
                        router.push('/auth/login');
                    }
                    else {
                        errors_1 = result.data.error.errors;
                        console.log(errors_1);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className={AuthLayout_module_scss_1["default"].wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <card_1.Card className={"p-mt-3"}>
                            <tabview_1.TabView className={AuthLayout_module_scss_1["default"].tabView} activeIndex={0}>
                                <tabview_1.TabPanel header="Quên mật khẩu">
                                    <div className="card">
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                            <div className="p-field">
                                                <span className="p-float-label">
                                                    <react_hook_form_1.Controller name="email" control={control} rules={{ required: 'Email không thể bỏ trống.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} autoFocus className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                                    <label htmlFor="email" className={utils_1.classNames({ 'p-error': errors.email })}>Email*</label>
                                                </span>
                                            </div>
                                            <button_1.Button type="submit" loading={loading} label="Tiếp tục" className="p-mt-2 p-ripple">
                                                <ripple_1.Ripple />
                                            </button_1.Button>
                                        </form>
                                    </div>
                                </tabview_1.TabPanel>
                            </tabview_1.TabView>
                        </card_1.Card>
                    </div>
                </div>
            </div>
        </div>);
};
exports["default"] = ForgotPassword;