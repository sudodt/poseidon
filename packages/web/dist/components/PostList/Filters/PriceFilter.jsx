"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Filters_module_scss_1 = require("./Filters.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var price_1 = require("@/utils/price");
var slider_1 = require("primereact/slider");
var computeRate = function (demand) {
    if (demand === 'cho-thue') {
        return 1000000;
    }
    else
        return 100000000;
};
var parsePrice = function (value, rate) {
    var arr = (value || '').split("-");
    var from = parseInt(arr[0]) / rate || 0;
    var to = parseInt(arr[1]) / rate || 0;
    return [from, to];
};
var PriceFilter = function (props) {
    var searchQuery = props.postCollection.query;
    var price = searchQuery.price;
    var rate = computeRate(searchQuery.demand);
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState("Kho\u1EA3ng gi\u00E1"), label = _b[0], setLabel = _b[1];
    var _c = react_1.useState([0, 100]), value = _c[0], setValue = _c[1];
    var _d = react_1.useState(0), min = _d[0], setMin = _d[1];
    var _e = react_1.useState(0), max = _e[0], setMax = _e[1];
    // handle click 
    var onChangeSelection = function (option) {
        props.search({
            key: "price",
            slug: min + "-" + max
        });
        setShow(false);
    };
    // rendering
    var renderSlideMenu = function () {
        return (<slider_1.Slider value={value} onChange={function (e) { return setValue(e.value); }} range/>);
    };
    var renderText = function () {
        var from = (min).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        var to = (max).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return (<span className='p-mb-2'>Giá từ {from} đến {to}</span>);
    };
    var renderFooter = function () {
        return (<react_1["default"].Fragment>
                <button_1.Button type="button" onClick={onChangeSelection} label="Áp dụng" className="p-mt-2 p-ripple">
                </button_1.Button>
            </react_1["default"].Fragment>);
    };
    react_1.useEffect(function () {
        setMin(value[0] * rate);
        setMax(value[1] * rate);
    }, [rate, value]);
    react_1.useEffect(function () {
        var string = '';
        if (value[0] === 0 && value[1] === 0)
            return;
        string += "" + price_1.priceText(value[0] * rate);
        if (value[1]) {
            string += " - " + price_1.priceText(value[1] * rate);
        }
        setLabel(string);
    }, [value, searchQuery.demand, rate]);
    return (<div className={Filters_module_scss_1["default"].fragment}>
            <dialog_1.Dialog header={'Giá'} footer={renderFooter()} visible={show} dismissableMask={true} position='top' onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }}>
                {renderText()}
                <div className='p-pt-5'>
                    {renderSlideMenu()}
                </div>
            </dialog_1.Dialog>
            <button_1.Button type="button" className={Filters_module_scss_1["default"].button + " p-button-outlined " + (props.maxWidth ? "w-100" : "")} label={label} onClick={function (e) { return setShow(true); }}>
                <span className='pi pi-angle-down'></span>
            </button_1.Button>
        </div>);
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
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PriceFilter);
