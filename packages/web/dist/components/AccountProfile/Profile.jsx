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
var Avatar_1 = require("./Avatar");
var Email_1 = require("./Email");
var Phone_1 = require("./Phone");
var button_1 = require("primereact/button");
var react_hook_form_1 = require("react-hook-form");
var inputtext_1 = require("primereact/inputtext");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var dropdown_1 = require("primereact/dropdown");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var accountsAction_1 = require("@/redux/actions/accountsAction");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var Account_1 = require("@/services/Account");
var universal_cookie_1 = require("universal-cookie");
var mapStateToProps = function (_a) {
    var accounts = _a.accounts, locations = _a.locations;
    return ({
        account: (accounts === null || accounts === void 0 ? void 0 : accounts.account) || {},
        locations: locations || {}
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch),
        fetchAccountRequest: redux_1.bindActionCreators(accountsAction_1.fetchAccountRequest, dispatch)
    };
};
var Profile = function (props) {
    var account = props.account;
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var _a = react_1.useState(false), editMode = _a[0], setEditMode = _a[1];
    var methods = react_hook_form_1.useForm({
        defaultValues: react_1.useMemo(function () {
            return account;
        }, [account])
    });
    var control = methods.control, errors = methods.formState.errors, handleSubmit = methods.handleSubmit, reset = methods.reset, setError = methods.setError, watch = methods.watch, setValue = methods.setValue;
    var city = watch('city');
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var form;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    form = new FormData();
                    form.append("name", data.name);
                    form.append("email", data.email);
                    form.append("phone", data.phone);
                    form.append("type_id", data.type.id);
                    form.append("city_id", (_a = data.city) === null || _a === void 0 ? void 0 : _a.id);
                    form.append("district_id", (_b = data.district) === null || _b === void 0 ? void 0 : _b.id);
                    if (data.avatar instanceof Object) {
                        form.append("avatar", data.avatar);
                    }
                    return [4 /*yield*/, Account_1["default"].updateProfile(token, form)];
                case 1:
                    _c.sent();
                    props.fetchAccountRequest({ token: token, isServer: false });
                    setEditMode(false);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        props.fetchLocationsRequest({
            type: locationsReducer_1.FETCH_CITIES
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.useEffect(function () {
        if (city) {
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_DISTRICTS, parent_id: city === null || city === void 0 ? void 0 : city.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);
    react_1.useEffect(function () {
        reset(props.account);
    }, [props.account, reset]);
    return (<react_1["default"].Fragment>
            <card_1.Card>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-grid">
                        <div className="p-col-12 p-d-flex p-jc-end">
                            <div>
                                {!editMode &&
            <button_1.Button label="Chỉnh sửa" onClick={function (e) { return setEditMode(!editMode); }} icon="pi pi-pencil" className="p-button-text"/>}
                            </div>
                        </div>
                        <div className="p-col-12">
                            <Avatar_1.default editMode={editMode} account={props.account} setValue={setValue}/>
                        </div>
                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="name" className="p-d-block">Họ tên</label>
                                <react_hook_form_1.Controller name="name" control={control} rules={{ required: 'Họ tên không thể bỏ trống' }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<inputtext_1.InputText id={field.name} readOnly={!editMode} {...field} onChange={function (e) { return field.onChange(e); }}/>);
        }}/>
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field">
                                <label htmlFor="city" className="p-d-block">Tỉnh/Thành phố</label>
                                <react_hook_form_1.Controller name="city" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown {...field} value={field.value} options={props.locations.cities} onChange={function (e) { return field.onChange(e.value); }} disabled={!editMode} optionLabel="full_name" placeholder="Chọn Tỉnh/Thành phố"/>);
        }}/>
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field">
                                <label htmlFor="district" className="p-d-block">Quận/Huyện</label>
                                <react_hook_form_1.Controller name="district" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<dropdown_1.Dropdown {...field} value={field.value} options={props.locations.districts} onChange={function (e) { return field.onChange(e.value); }} disabled={!editMode} optionLabel="full_name" placeholder="Chọn Quận/Huyện"/>);
        }}/>
                            </div>
                        </div>

                        {!editMode &&
            <div className="p-col-12">
                                <Email_1.default editMode={editMode} account={props.account}/>
                            </div>}
                        {!editMode &&
            <div className="p-col-12">
                                <Phone_1.default editMode={editMode} account={props.account}/>
                            </div>}

                        {editMode &&
            <div className="p-col-12">
                                <div className="p-d-flex">
                                    <button_1.Button label="Lưu" type="submit"/>
                                    <button_1.Button label="Huỷ" onClick={function (e) {
                    setEditMode(false);
                    reset();
                }} className="p-button-text"/>
                                </div>
                            </div>}
                    </div>
                </form>
            </card_1.Card>
        </react_1["default"].Fragment>);
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Profile);
