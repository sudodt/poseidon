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
var react_hook_form_1 = require("react-hook-form");
var inputtext_1 = require("primereact/inputtext");
var button_1 = require("primereact/button");
var password_1 = require("primereact/password");
var checkbox_1 = require("primereact/checkbox");
var utils_1 = require("primereact/utils");
var Auth_1 = require("@/services/Auth");
var router_1 = require("next/router");
var Register = function () {
    var router = router_1.useRouter();
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_hook_form_1.useForm(), control = _b.control, setError = _b.setError, errors = _b.formState.errors, handleSubmit = _b.handleSubmit, reset = _b.reset;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var register, errorMessages, key;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, Auth_1["default"].register(data)];
                case 1:
                    register = _c.sent();
                    if (!register.data.error) {
                        router.push("/auth/verify?email=" + register.data.email + "&uuid=" + register.data.uuid);
                    }
                    else {
                        errorMessages = ((_b = (_a = register.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.errors) || [];
                        for (key in errorMessages) {
                            setError(key, { type: "manual", message: errorMessages[key] });
                        }
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };
    return (<div className="form-register">
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <react_hook_form_1.Controller name="name" control={control} rules={{ required: 'Họ tên không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} autoFocus className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                            <label htmlFor="name" className={utils_1.classNames({ 'p-error': errors.name })}>Họ tên*</label>
                        </span>
                        {getFormErrorMessage('name')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-phone"/>
                            <react_hook_form_1.Controller name="phone" control={control} rules={{ required: 'Số điện thoại không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                            <label htmlFor="phone" className={utils_1.classNames({ 'p-error': !!errors.phone })}>Số điện thoại*</label>
                        </span>
                        {getFormErrorMessage('phone')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope"/>
                            <react_hook_form_1.Controller name="email" control={control} rules={{ required: 'Email không thể bỏ trống.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                            <label htmlFor="email" className={utils_1.classNames({ 'p-error': !!errors.email })}>Email*</label>
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <react_hook_form_1.Controller name="password" control={control} rules={{ required: 'Mật khẩu không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<password_1.Password id={field.name} {...field} toggleMask className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                            <label htmlFor="password" className={utils_1.classNames({ 'p-error': errors.password })}>Mật khẩu*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <react_hook_form_1.Controller name="password_confirmation" control={control} rules={{ required: 'Nhập lại khẩu không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} type="password" className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                            <label htmlFor="password_confirmation" className={utils_1.classNames({ 'p-error': errors.password_confirmation })}>
                                Nhập lại mật khẩu*
                            </label>
                        </span>
                        {getFormErrorMessage('password_confirmation')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field-checkbox">
                        <react_hook_form_1.Controller name="accept" control={control} rules={{ required: true }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<checkbox_1.Checkbox inputId={field.name} onChange={function (e) { return field.onChange(e.checked); }} checked={field.value} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                        <label htmlFor="accept" className={utils_1.classNames({ 'p-error': errors.accept })}>Tôi đồng ý với các chính sách và điều khoản thành viên của Bdstotnhat.com*</label>
                    </div>
                    </div>

                    <button_1.Button type="submit" label="Đăng kí" className="p-mt-2 p-ripple" loading={loading}/>
                </form>
            </div>
        </div>);
};
exports["default"] = Register;
