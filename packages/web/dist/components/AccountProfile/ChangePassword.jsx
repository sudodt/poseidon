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
var card_1 = require("primereact/card");
var react_hook_form_1 = require("react-hook-form");
var password_1 = require("primereact/password");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var accountsAction_1 = require("@/redux/actions/accountsAction");
var universal_cookie_1 = require("universal-cookie");
var button_1 = require("primereact/button");
var mapStateToProps = function (_a) {
    var accounts = _a.accounts, locations = _a.locations;
    return ({
        locations: locations || {}
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAccountRequest: redux_1.bindActionCreators(accountsAction_1.fetchAccountRequest, dispatch)
    };
};
var ChangePassword = function (props) {
    var account = props.account;
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var methods = react_hook_form_1.useForm();
    var control = methods.control, errors = methods.formState.errors, handleSubmit = methods.handleSubmit, reset = methods.reset, setError = methods.setError, watch = methods.watch;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(data);
            // await AccountDataService.updateProfile(token, {
            //     'name' : data.name,
            //     'email' : data.email,
            //     'phone' : data.phone,
            //     'type_id' : data.type?.id,
            //     'city_id' : data.profile?.city?.id,
            //     'district_id' : data.profile?.district?.id,
            // });
            props.fetchAccountRequest({ token: token, isServer: false });
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        reset(props.account);
    }, [props.account, reset]);
    return (<react_1["default"].Fragment>
            <card_1.Card>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="name" className="p-d-block">Mật khẩu cũ*</label>
                                <react_hook_form_1.Controller name="password" control={control} rules={{ required: 'Họ tên không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<password_1.Password id="password" {...field} feedback={false} toggleMask onChange={function (e) { return field.onChange(e); }}/>);
        }}/>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="profile.city" className="p-d-block">Mật khẩu mới*</label>
                                <react_hook_form_1.Controller name="new_password" control={control} rules={{ required: 'Họ tên không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<password_1.Password id="new_password" {...field} feedback={false} toggleMask onChange={function (e) { return field.onChange(e); }}/>);
        }}/>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="profile.district" className="p-d-block">Nhập lại mật khẩu mới*</label>
                                <react_hook_form_1.Controller name="new_password_confirmation" control={control} rules={{ required: 'Họ tên không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<password_1.Password id="new_password_confirmation" {...field} feedback={false} toggleMask onChange={function (e) { return field.onChange(e); }}/>);
        }}/>
                            </div>
                        </div>

                        <div className="p-col-12">
                                <div className="p-d-flex">
                                    <button_1.Button label="Cập nhật" type="submit"/>
                                </div>
                            </div>
                    </div>
                </form>
            </card_1.Card>
        </react_1["default"].Fragment>);
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
