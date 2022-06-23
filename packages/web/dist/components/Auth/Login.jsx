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
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var inputtext_1 = require("primereact/inputtext");
var button_1 = require("primereact/button");
var password_1 = require("primereact/password");
var checkbox_1 = require("primereact/checkbox");
var utils_1 = require("primereact/utils");
var ripple_1 = require("primereact/ripple");
var messages_1 = require("primereact/messages");
var link_1 = require("next/link");
var AuthLayout_module_scss_1 = require("./AuthLayout.module.scss");
var universal_cookie_1 = require("universal-cookie");
var Auth_1 = require("@/services/Auth");
var Login = function () {
    var cookie = new universal_cookie_1["default"]();
    var router = router_1.useRouter();
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var message = react_1.useRef(null);
    var _b = react_hook_form_1.useForm(), control = _b.control, errors = _b.formState.errors, handleSubmit = _b.handleSubmit, reset = _b.reset;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data_1, next, account;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    // @ts-ignore: Object is possibly 'null'.
                    message.current.clear();
                    setLoading(true);
                    return [4 /*yield*/, Auth_1["default"].login(data)];
                case 1:
                    response = _f.sent();
                    if (response.status === 423) {
                        data_1 = response.data;
                        return [2 /*return*/, router.push("/auth/verify?email=" + ((_a = data_1.data) === null || _a === void 0 ? void 0 : _a.email) + "&uuid=" + ((_b = data_1.data) === null || _b === void 0 ? void 0 : _b.uuid))];
                    }
                    if (!response.error) return [3 /*break*/, 2];
                    // @ts-ignore: Object is possibly 'null'.
                    message.current.show([
                        { severity: 'error', summary: 'Tài khoản hoặc mật khẩu không đúng' },
                    ]);
                    return [3 /*break*/, 4];
                case 2:
                    next = String(((_c = router === null || router === void 0 ? void 0 : router.query) === null || _c === void 0 ? void 0 : _c.countinue) || '/accounts');
                    cookie.set('USER_TOKEN', (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.access_token, { path: '/' });
                    return [4 /*yield*/, Auth_1["default"].getAccount((_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e.access_token)];
                case 3:
                    account = _f.sent();
                    cookie.set('USER_PROFILE', JSON.stringify(account === null || account === void 0 ? void 0 : account.data), { path: '/' });
                    router.push(next);
                    _f.label = 4;
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };
    return (<div className="form-login p-mt-3">
            <div className="card">
                <div className="p-pb-2">
                    <messages_1.Messages ref={message}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-phone"/>
                                <react_hook_form_1.Controller name="email" control={control} rules={{ required: 'Số điện thoại không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="email" className={utils_1.classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('account')}
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label">
                                <react_hook_form_1.Controller name="password" control={control} rules={{ required: 'Mật khẩu không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<password_1.Password id={field.name} {...field} toggleMask feedback={false} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="password" className={utils_1.classNames({ 'p-error': errors.password })}>Mật khẩu*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                    </div>


                    <div className={'p-grid p-mt-2'}>
                        <div className={'p-md-6'}>
                            <div className="p-field-checkbox">
                                <react_hook_form_1.Controller name="remember" control={control} rules={{ required: false }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<checkbox_1.Checkbox inputId={field.name} onChange={function (e) { return field.onChange(e.checked); }} checked={field.value} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="remember" className={utils_1.classNames({ 'p-error': errors.remember })}>Ghi nhớ</label>
                            </div>
                        </div>
                        <div className="p-md-6 p-d-flex p-jc-end">
                            <link_1.default href="/auth/forgot-password">
                                <a>Quên mật khẩu ?</a>
                            </link_1.default>
                        </div>
                    </div>

                    <button_1.Button type="submit" loading={loading} label="Đăng nhập" className="p-mt-2 p-ripple">
                        <ripple_1.Ripple />
                    </button_1.Button>

                    <div className={'p-grid p-mt-2'}>
                        <div className={'p-md-6'}>
                            <button_1.Button className={AuthLayout_module_scss_1["default"].google + " p-ripple"} type="button">
                                <i className="pi pi-google p-px-2"></i>
                                <span className="p-px-3">Google</span>
                                <ripple_1.Ripple />
                            </button_1.Button>
                        </div>
                        <div className={'p-md-6'}>
                            <button_1.Button className={AuthLayout_module_scss_1["default"].facebook + " p-ripple"} type="button">
                                <i className="pi pi-facebook p-px-2"></i>
                                <span className="p-px-3">Facebook</span>
                                <ripple_1.Ripple />
                            </button_1.Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
};
exports["default"] = Login;
