"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var card_1 = require("primereact/card");
var react_hook_form_1 = require("react-hook-form");
var utils_1 = require("primereact/utils");
var inputtext_1 = require("primereact/inputtext");
var radiobutton_1 = require("primereact/radiobutton");
var dropdown_1 = require("primereact/dropdown");
var app_json_1 = require("../../config/app.json");
var MapView = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("./MapView"); }); }, { ssr: false });
var locationsAction_1 = require("@/redux/actions/locationsAction");
var postsAttributesAction_1 = require("@/redux/actions/postsAttributesAction");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var Overview = function (props) {
    var _a = react_hook_form_1.useFormContext(), control = _a.control, errors = _a.formState.errors, handleSubmit = _a.handleSubmit, reset = _a.reset, setValue = _a.setValue, watch = _a.watch;
    var watchDemand = watch('demand_id');
    var watchCategory = watch('category_id');
    var city = watch('city_id');
    var district = watch('district_id');
    var locations = props.locations;
    var postsAttributes = props.postsAttributes;
    var specialties = postsAttributes.specialties;
    var messageRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (city) {
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_DISTRICTS, parent_id: city.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);
    react_1.useEffect(function () {
        if (district) {
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_WARDS, parent_id: district.id });
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_STREETS, parent_id: district.id });
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_AREAS, parent_id: district.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district]);
    react_1.useEffect(function () {
        if (watchCategory.id) {
            props.fetchSpecialtiesRequest(watchCategory.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchCategory]);
    var getFormErrorMessage = function (name) {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };
    return (<div className={"container"}>
            <card_1.Card>
                <h3>1. Vị trí & nhu cầu</h3>

                <div className={"p-grid"}>
                    <div className={"p-md-6 p-lg-6 p-col-12"}>

                        <div className="p-field">
                            <div className="p-grid">
                                <div className="p-md-2 p-lg-2 p-col-12">
                                    <label className={utils_1.classNames({ 'p-error': !!errors.demand })}>Nhu cầu*</label>
                                </div>
                                <div className="p-md-8 p-lg-8 p-col-12">
                                    <react_hook_form_1.Controller name="demand_id" control={control} rules={{ required: 'Nhu cầu không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<>
                                                {app_json_1["default"].demandData.map(function (opt) {
                    return (<div className="p-field-radiobutton" key={opt.id}>
                                                            <radiobutton_1.RadioButton id={"demand-" + opt.id} {...field} value={opt.id} checked={watchDemand === opt.id} onChange={function (e) { setValue('demand_id', e.value); }}/>
                                                            <label htmlFor={"demand-" + opt.id}>{opt.label}</label>
                                                        </div>);
                })}
                                            </>);
        }}/>
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="category_id" control={control} rules={{ required: 'Loại BĐS không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={postsAttributes.categories} optionLabel="name" filter filterBy="name"/>);
        }}/>
                                        <label htmlFor="category_id" className={utils_1.classNames({ 'p-error': !!errors.category_id })}>Loại BĐS*</label>
                                    </span>
                                    {getFormErrorMessage('category_id')}
                                </div>
                            </div>
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className={"p-field " + (!watchCategory && 'p-d-none')}>
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="specialty_id" control={control} rules={{ required: "Lo\u1EA1i " + (watchCategory === null || watchCategory === void 0 ? void 0 : watchCategory.name) + " kh\u00F4ng th\u1EC3 b\u1ECF tr\u1ED1ng" }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={specialties} optionLabel="name" filter showClear filterBy="name"/>);
        }}/>
                                        <label htmlFor="specialty_id" className={utils_1.classNames({ 'p-error': !!errors.specialty_id })}>Loại {watchCategory === null || watchCategory === void 0 ? void 0 : watchCategory.name}</label>
                                    </span>
                                    {getFormErrorMessage('specialty_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="city_id" control={control} rules={{ required: 'Tỉnh/Thành phố không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={locations.cities} optionLabel="full_name" filter filterBy="name"/>);
        }}/>
                                        <label htmlFor="city_id" className={utils_1.classNames({ 'p-error': !!errors.city_id })}>Tỉnh/Thành phố*</label>
                                    </span>
                                    {getFormErrorMessage('city_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="district_id" control={control} rules={{ required: 'Quận/huyện không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={locations.districts} optionLabel="full_name" filter filterBy="name"/>);
        }}/>
                                        <label htmlFor="district_id" className={utils_1.classNames({ 'p-error': !!errors.district_id })}>Quận/huyện*</label>
                                    </span>
                                    {getFormErrorMessage('district_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="ward_id" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown id={field.name} {...field} options={locations.wards} optionLabel="full_name" filter showClear filterBy="name"/>);
        }}/>
                                        <label htmlFor="ward_id" className={utils_1.classNames({ 'p-error': !!errors.ward_id })}>Phường/xã</label>
                                    </span>
                                    {getFormErrorMessage('ward_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="street_id" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown className={utils_1.classNames({ 'p-invalid': fieldState.invalid })} id={field.name} {...field} options={locations.streets} optionLabel="full_name" filter filterBy="name"/>);
        }}/>
                                        <label htmlFor="street_id" className={utils_1.classNames({ 'p-error': !!errors.street_id })}>Đường/phố</label>
                                    </span>
                                    {getFormErrorMessage('street_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="area_id" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown id={field.name} {...field} options={locations.areas} optionLabel="full_name" filter showClear filterBy="name"/>);
        }}/>
                                        <label htmlFor="area_id" className={utils_1.classNames({ 'p-error': !!errors.area_id })}>Khu vực</label>
                                    </span>
                                    {getFormErrorMessage('area_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <react_hook_form_1.Controller name="address" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} {...field} className={utils_1.classNames({ 'p-invalid': fieldState.invalid })}/>);
        }}/>
                                        <label htmlFor="address" className={utils_1.classNames({ 'p-error': !!errors.address })}>Địa chỉ/số nhà</label>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"p-md-6 p-lg-6 p-col-12"}>
                        <MapView />
                    </div>
                </div>
            </card_1.Card>
        </div>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch),
        fetchSpecialtiesRequest: redux_1.bindActionCreators(postsAttributesAction_1.fetchSpecialtiesRequest, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postsAttributes = _a.postsAttributes, postSpecialties = _a.postSpecialties;
    return ({
        locations: locations,
        postsAttributes: postsAttributes,
        postSpecialties: postSpecialties
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Overview);
