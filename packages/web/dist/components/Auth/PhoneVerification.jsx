"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var utils_1 = require("primereact/utils");
var inputtext_1 = require("primereact/inputtext");
var ripple_1 = require("primereact/ripple");
var Auth_1 = require("@/services/Auth");
var PhoneVerification = function (props) {
    var router = router_1.useRouter();
    var _a = react_hook_form_1.useForm(), control = _a.control, errors = _a.formState.errors, handleSubmit = _a.handleSubmit, reset = _a.reset;
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>;
    };
    var onSubmit = function (data) {
        props.showVerify.confirm(data.code).then(function (result) {
            var user = result.user;
            Auth_1["default"].phoneVerification(Object.assign({ uid: user.localId }, props.account));
            router.push('/accounts');
        })["catch"](function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    };
    return (<dialog_1.Dialog visible={props.showVerify} onHide={function () { return props.setVerify(false); }} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
            <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}/>
                <h5 className={'p-text-center'}>Một tin nhắn chứa mã xác thực vừa gửi đến số điện thoại bạn vừa đăng kí, nhập mã để tiếp tục</h5>

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

                    <div className="p-d-flex p-jc-center">
                        <button_1.Button type="submit" label="Tiếp tục" className="p-mt-2 p-ripple">
                            <ripple_1.Ripple />
                        </button_1.Button>
                    </div>

                </form>

            </div>
        </dialog_1.Dialog>);
};
exports["default"] = PhoneVerification;
