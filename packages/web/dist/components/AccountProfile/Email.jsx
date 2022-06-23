"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var inputtext_1 = require("primereact/inputtext");
var AccountProfile_module_scss_1 = require("./AccountProfile.module.scss");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var utils_1 = require("primereact/utils");
var react_hook_form_1 = require("react-hook-form");
var Email = function (props) {
    var account = props.account;
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = react_hook_form_1.useForm(), control = _b.control, errors = _b.formState.errors, handleSubmit = _b.handleSubmit, reset = _b.reset;
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>;
    };
    var onSubmit = function (data) {
        console.log(data);
    };
    return (<react_1["default"].Fragment>
            <div className={"p-field " + AccountProfile_module_scss_1["default"].field}>
                <label htmlFor="name" className="p-d-block">Email</label>
                <inputtext_1.InputText readOnly={!props.editMode ? true : false} value={account.email}/>
                <button_1.Button label="Cập nhật" icon="pi pi-pencil" onClick={function (e) { setVisible(!visible); }} className={"p-button-text " + AccountProfile_module_scss_1["default"].rightButton}/>
            </div>
            <dialog_1.Dialog visible={visible} onHide={function () { }} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="p-field w-100">
                            <span className="p-float-label">
                                <react_hook_form_1.Controller name="code" control={control} rules={{ required: 'Mã xác thực không thể bỏ trống.' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} autoFocus className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="code" className={utils_1.classNames({ 'p-error': errors.code })}>Email mới *</label>
                            </span>
                            {getFormErrorMessage('code')}
                        </div>
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
                            <button_1.Button type="submit" label="Cập nhật" className="p-mt-2 p-ripple">
                            </button_1.Button>
                        </div>

                    </form>

                </div>
            </dialog_1.Dialog>
        </react_1["default"].Fragment>);
};
exports["default"] = react_redux_1.connect(null, null)(Email);
