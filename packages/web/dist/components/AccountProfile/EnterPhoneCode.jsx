"use strict";
exports.__esModule = true;
var react_1 = require("react");
var inputtext_1 = require("primereact/inputtext");
var utils_1 = require("primereact/utils");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var react_hook_form_1 = require("react-hook-form");
var Account_1 = require("@/services/Account");
var universal_cookie_1 = require("universal-cookie");
var toast_1 = require("primereact/toast");
var router_1 = require("next/router");
var EnterPhoneCode = function (props) {
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var toastRef = react_1.useRef(null);
    var account = props.account || {};
    var router = router_1.useRouter();
    var _a = react_hook_form_1.useForm(), control = _a.control, errors = _a.formState.errors, handleSubmit = _a.handleSubmit, reset = _a.reset;
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>;
    };
    var onSubmit = function (data) {
        props.confirmationResult.confirm(data.code).then(function (result) {
            var _a;
            // User signed in successfully.
            var user = result.user;
            var verify = Account_1["default"].verifyFirebaseUser(token, {
                'firebase_uid': user.uid
            });
            if (!verify.error) {
                Account_1["default"].updateProfile(token, {
                    'phone': props.phoneNumber,
                    'type_id': props.type,
                    'name': account.name,
                    'email': account.email
                });
                router.push(((_a = router === null || router === void 0 ? void 0 : router.query) === null || _a === void 0 ? void 0 : _a.countinue) + '' || '/accounts');
            }
        })["catch"](function (error) {
            // @ts-ignore
            toastRef.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Mã xác thực không chính xác' });
        });
    };
    return (<react_1["default"].Fragment>
            <toast_1.Toast ref={toastRef}/>
            <dialog_1.Dialog visible={!!props.confirmationResult} 
    // visible={true}
    onHide={function () { }} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}/>
                    <h5 className={'p-text-center'}>Một tin nhắn chứa mã xác thực bao gồm 6 kí tự vừa được gửi đến số điện thoại bạn vừa đăng kí, nhập mã để tiếp tục</h5>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                        <div className="p-field">
                            <span className="p-float-label">
                                <react_hook_form_1.Controller name="code" control={control} rules={{ required: 'Mã xác thực không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} autoFocus className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="code" className={utils_1.classNames({ 'p-error': errors.code })}>Mã xác thực*</label>
                            </span>
                            {getFormErrorMessage('code')}
                        </div>
                        <div className="p-field">
                            <a href="#">Tôi không nhận được mã xác thực ? Gửi lại</a>
                        </div>
                        <div className="p-d-flex p-jc-center">
                            <button_1.Button type="submit" label="Xác thực" className="p-mt-2 p-ripple">
                            </button_1.Button>
                        </div>

                    </form>

                </div>
            </dialog_1.Dialog>
        </react_1["default"].Fragment>);
};
exports["default"] = EnterPhoneCode;
