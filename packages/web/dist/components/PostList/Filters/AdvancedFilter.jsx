"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Filters_module_scss_1 = require("./Filters.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var LocationFilter_1 = require("./LocationFilter");
var CategoryFilter_1 = require("./CategoryFilter");
var PriceFilter_1 = require("./PriceFilter");
var AcreageFilter_1 = require("./AcreageFilter");
var Counter_1 = require("./Counter");
var dropdown_1 = require("primereact/dropdown");
var router_1 = require("next/router");
var opts = require("../../../config/selectOptions");
var useMobileDetect_1 = require("@/utils/hooks/useMobileDetect");
var AdvancedFilter = function (props) {
    var searchQuery = props.postCollection.query;
    var router = router_1.useRouter();
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState("L\u1ECDc"), label = _b[0], setLabel = _b[1];
    var search = props.search;
    var currentDevice = useMobileDetect_1["default"]();
    var isMobile = currentDevice.isMobile() || false;
    var handle = function (option) {
        props.search(option);
    };
    var renderFooter = function () {
        return (<react_1["default"].Fragment>
                <button_1.Button type="button" onClick={function (e) { return setShow(false); }} label="Bỏ lọc" className="p-mt-2 p-button-text p-ripple">
                </button_1.Button>
                <button_1.Button type="button" onClick={function (e) { return setShow(false); }} label="Áp dụng" className="p-mt-2 p-ripple">
                </button_1.Button>
            </react_1["default"].Fragment>);
    };
    return (<div className={Filters_module_scss_1["default"].fragment}>
            <dialog_1.Dialog header={'Lọc kết quả'} footer={renderFooter()} visible={show} dismissableMask={true} position='top' onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }}>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Vị trí</label>
                    <LocationFilter_1.default search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Loại BĐS</label>
                    <CategoryFilter_1.default search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Khoảng giá</label>
                    <PriceFilter_1.default search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Diện tích</label>
                    <AcreageFilter_1.default search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Số phòng ngủ</label>
                    <Counter_1.default search={search} string="phòng ngủ" searchKey="bedroom"/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Số WC</label>
                    <Counter_1.default search={search} string="WC" searchKey="bathroom"/>
                </div>
                <div className="p-col-12">
                    <DropdownFilter placeholder={"Hướng bất kì"} label="Hướng cửa chính" searchKey="direction" options={opts.directOptions} action={handle} value={searchQuery.direction}/>
                </div>
                <div className="p-col-12">
                    <DropdownFilter placeholder={"Pháp lý bất kì"} label="Giấy tờ pháp lý" searchKey="juridical" options={opts.juridicalOptions} action={handle} value={searchQuery.juridical}/>
                </div>
            </dialog_1.Dialog>
            <button_1.Button type="button" icon="pi pi-filter" className={Filters_module_scss_1["default"].button + " p-button-outlined"} label={label} onClick={function (e) { return setShow(true); }}>
                    <span className='pi pi-angle-down'></span>
                </button_1.Button>
            
        </div>);
};
var DropdownFilter = function (props) {
    var onChangeSelection = function (e) {
        var targetOption = props.options.find(function (res) {
            return parseInt(res.value) == parseInt(e.value);
        });
        Object.assign(targetOption, { key: props.searchKey });
        return props.action(targetOption);
    };
    return (<react_1["default"].Fragment>
            <label className="p-d-block p-pb-1">{props.label}</label>
            <dropdown_1.Dropdown placeholder={props.placeholder} className={"w-100"} options={props.options} optionLabel="label" onChange={onChangeSelection} value={props.value}/>
        </react_1["default"].Fragment>);
};
var mapStateToProps = function (_a) {
    var postsAttributes = _a.postsAttributes, postCollection = _a.postCollection;
    return ({
        categories: postsAttributes.categories,
        postCollection: postCollection
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        updateQuery: redux_1.bindActionCreators(postCollectionAction_1.updateQuery, dispatch),
        fetchPostsRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsSeoMetaRequest, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdvancedFilter);
