"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var card_1 = require("primereact/card");
var react_hook_form_1 = require("react-hook-form");
var utils_1 = require("primereact/utils");
var inputtext_1 = require("primereact/inputtext");
var inputnumber_1 = require("primereact/inputnumber");
var dropdown_1 = require("primereact/dropdown");
var inputtextarea_1 = require("primereact/inputtextarea");
var Detail_module_scss_1 = require("./Detail.module.scss");
var Checkbox_1 = require("../Shared/Checkbox");
var opts = require("../../config/selectOptions");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var Detail = function (props) {
    var _a;
    var _b = react_hook_form_1.useFormContext(), control = _b.control, errors = _b.formState.errors, handleSubmit = _b.handleSubmit, reset = _b.reset, setValue = _b.setValue, watch = _b.watch;
    var attributes = ((_a = props.postsAttributes) === null || _a === void 0 ? void 0 : _a.attributes) || [];
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };
    return (<div className={Detail_module_scss_1["default"].wrapper + " container"}>
            <card_1.Card>
                <h3>2. Thông tin chi tiết</h3>
                <div className={"p-grid"}>
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="title" control={control} rules={{ required: 'Tiêu đề không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="title" className={utils_1.classNames({ 'p-error': !!errors.title })}>Tiêu đề*</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="price" control={control} rules={{ required: 'Giá không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} mode="currency" currency="VND" locale="vi-VN" {...field} onChange={function (e) { return field.onChange(e.value); }} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="price" className={utils_1.classNames({ 'p-error': !!errors.price })}>Giá (VNĐ)*</label>
                            </span>
                            {getFormErrorMessage('price')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="acreage" control={control} rules={{ required: 'Diện tích không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} {...field} onChange={function (e) { return field.onChange(e.value); }} suffix=" m2" className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="acreage" className={utils_1.classNames({ 'p-error': !!errors.acreage })}>Diện tích (m2) *</label>
                            </span>
                            {getFormErrorMessage('acreage')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="acreage_used" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} {...field} onChange={function (e) { return field.onChange(e.value); }} suffix=" m2" className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="acreage_used" className={utils_1.classNames({ 'p-error': !!errors.acreage_used })}>Diện tích sử dụng (m2)</label>
                            </span>
                            {getFormErrorMessage('acreage_used')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="front" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} {...field} onChange={function (e) { return field.onChange(e.value); }} suffix=" m" className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="front" className={utils_1.classNames({ 'p-error': !!errors.front })}>Mặt tiền (m)</label>
                            </span>
                            {getFormErrorMessage('front')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="footage" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} {...field} onChange={function (e) { return field.onChange(e.value); }} suffix=" m" className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="footage" className={utils_1.classNames({ 'p-error': !!errors.footage })}>Chiều sâu (m)</label>
                            </span>
                            {getFormErrorMessage('footage')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="bedroom" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={opts.bedroomOptions} optionLabel="label"/>);
        }}/>
                                <label htmlFor="bedroom" className={utils_1.classNames({ 'p-error': !!errors.bedroom })}>Số phòng ngủ</label>
                            </span>
                            {getFormErrorMessage('bedroom')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="bathroom" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={opts.bathroomOptions} optionLabel="label"/>);
        }}/>
                                <label htmlFor="bathroom" className={utils_1.classNames({ 'p-error': !!errors.bathroom })}>Số phòng tắm</label>
                            </span>
                            {getFormErrorMessage('bathroom')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="floor" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={opts.floorOptions} optionLabel="label"/>);
        }}/>
                                <label htmlFor="floor" className={utils_1.classNames({ 'p-error': !!errors.floor })}>Số tầng</label>
                            </span>
                            {getFormErrorMessage('floor')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="juridical_id" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={opts.juridicalOptions} optionLabel="label"/>);
        }}/>
                                <label htmlFor="juridical_id" className={utils_1.classNames({ 'p-error': !!errors.juridical_id })}>Pháp lý</label>
                            </span>
                            {getFormErrorMessage('juridical_id')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="direction_id" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={opts.directOptions} optionLabel="label"/>);
        }}/>
                                <label htmlFor="direction_id" className={utils_1.classNames({ 'p-error': !!errors.direction_id })}>Hướng mặt tiền</label>
                            </span>
                            {getFormErrorMessage('direction_id')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="builder_year" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="builder_year" className={utils_1.classNames({ 'p-error': !!errors.builder_year })}>Năm xây dựng</label>
                            </span>
                            {getFormErrorMessage('builder_year')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="deposit" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputnumber_1.InputNumber id={field.name} mode="currency" currency="VND" locale="vi-VN" {...field} onChange={function (e) { return field.onChange(e.value); }} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="deposit" className={utils_1.classNames({ 'p-error': !!errors.deposit })}>Đặt cọc trước</label>
                            </span>
                            {getFormErrorMessage('deposit')}
                        </div>
                    </div>

                </div>

                <div className="p-grid">
                    <div className="p-md-6 p-lg-6 p-col-12">
                        <react_hook_form_1.Controller name="property_ids" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<Checkbox_1.default {...field} options={attributes.filter(function (res) {
                    return res.type_id === 2;
                })} name="property_ids" title="Tiện ích xung quanh"/>);
        }}/>
                    </div>

                    <div className="p-md-6 p-lg-6 p-col-12">
                        <react_hook_form_1.Controller name="furniture_ids" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<Checkbox_1.default {...field} options={attributes.filter(function (res) {
                    return res.type_id === 1;
                })} name="furniture_ids" title="Tiện ích nội thất"/>);
        }}/>
                    </div>

                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <react_hook_form_1.Controller name="description" control={control} rules={{ required: 'Nội dung tin đăng không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtextarea_1.InputTextarea id={field.name} autoResize rows={5} cols={30} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                <label htmlFor="description" className={utils_1.classNames({ 'p-error': !!errors.description })}>Chi tiết</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div>
                    </div>
                </div>
            </card_1.Card>
        </div>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var postsAttributes = _a.postsAttributes;
    return ({
        postsAttributes: postsAttributes
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Detail);
