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
var AuthLayout_module_scss_1 = require("../Auth/AuthLayout.module.scss");
var card_1 = require("primereact/card");
var tabview_1 = require("primereact/tabview");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var inputtext_1 = require("primereact/inputtext");
var utils_1 = require("primereact/utils");
var button_1 = require("primereact/button");
var ripple_1 = require("primereact/ripple");
var radiobutton_1 = require("primereact/radiobutton");
var Account_1 = require("@/services/Account");
var user_json_1 = require("@/config/user.json");
var react_redux_1 = require("react-redux");
var auth_1 = require("firebase/auth");
var firebase_1 = require("@/utils/firebase");
var universal_cookie_1 = require("universal-cookie");
var EnterPhoneCode_1 = require("./EnterPhoneCode");
var toast_1 = require("primereact/toast");
var userTypes = user_json_1["default"].types;
var Onboarding = function (props) {
    var router = router_1.useRouter();
    var account = props.account;
    var cookie = new universal_cookie_1["default"]();
    var toastRef = react_1.useRef(null);
    var labelString = 'Tiếp tục đăng tin';
    var _a = react_1.useState(null), appVerify = _a[0], setAppVerify = _a[1];
    var _b = react_1.useState(null), comfirmation = _b[0], setConfirmation = _b[1];
    var _c = react_1.useState(''), phone = _c[0], setPhone = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var defaultValues = {
        type: userTypes[0].id + '',
        phone: account.phone
    };
    var _e = react_hook_form_1.useForm({ defaultValues: defaultValues }), control = _e.control, errors = _e.formState.errors, handleSubmit = _e.handleSubmit, reset = _e.reset, watch = _e.watch, setValue = _e.setValue;
    var watchType = parseInt(watch('type'));
    var auth = auth_1.getAuth(firebase_1["default"]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var token, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    token = cookie.get('USER_TOKEN');
                    return [4 /*yield*/, Account_1["default"].validateUnique(token, {
                            'phone': data.phone
                        })];
                case 1:
                    result = _a.sent();
                    if (!result.error) {
                        setPhone(data.phone);
                        submitPhoneNumberAuth(data.phone);
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (typeof window !== 'undefined' && auth) {
            var recaptchaVerifier_1 = new auth_1.RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': function (response) {
                    setAppVerify(recaptchaVerifier_1);
                },
                'expired-callback': function (error) {
                    window.alert(error.code + ", " + error.message);
                }
            }, auth);
            recaptchaVerifier_1.render();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var submitPhoneNumberAuth = function (phoneNumber) {
        return auth_1.signInWithPhoneNumber(auth, "+84" + phoneNumber, appVerify)
            .then(function (confirmationResult) {
            setConfirmation(confirmationResult);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    return (<div className={AuthLayout_module_scss_1["default"].wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <toast_1.Toast ref={toastRef}/>
                        <card_1.Card className={"p-mt-3"}>
                            <tabview_1.TabView className={AuthLayout_module_scss_1["default"].tabView} activeIndex={0}>
                                <tabview_1.TabPanel header={labelString}>
                                    <div className="card">
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                            <div className="p-field">
                                                <label htmlFor="code" className={utils_1.classNames({ 'p-error': errors.type })}>Tôi là *</label>
                                                <react_hook_form_1.Controller name="type" control={control} rules={{ required: 'Loại tài khoản không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<>
                                                            {userTypes.map(function (opt) {
                    return (<div className="p-field-radiobutton" key={opt.id}>
                                                                        <radiobutton_1.RadioButton id={"type-" + opt.id} {...field} value={opt.id} checked={watchType === opt.id} onChange={function (e) { setValue('type', e.value); }}/>
                                                                        <label htmlFor={"type-" + opt.id}>{opt.string} đăng tin</label>
                                                                    </div>);
                })}
                                                        </>);
        }}/>
                                            </div>
                                            
                                            <div className="p-field">
                                                <label htmlFor="phone" className={utils_1.classNames({ 'p-error': errors.phone })}>Số điện thoại*</label>
                                                <react_hook_form_1.Controller name="phone" control={control} rules={{ required: 'Số điện thoại không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} autoFocus className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                            </div>
                                            <div className="p-field">
                                                <div id="recaptcha-container"></div>
                                            </div>
                                            <button_1.Button type="submit" loading={loading} label="Tiếp tục" className="p-mt-2 p-ripple">
                                                <ripple_1.Ripple />
                                            </button_1.Button>
                                        </form>
                                        <EnterPhoneCode_1.default phoneNumber={phone} appVerify={appVerify} confirmationResult={comfirmation} account={account} type={watchType}/>
                                    </div>
                                </tabview_1.TabPanel>
                            </tabview_1.TabView>
                        </card_1.Card>
                    </div>
                </div>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var accounts = _a.accounts;
    return ({
        account: (accounts === null || accounts === void 0 ? void 0 : accounts.account) || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Onboarding);
