"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Filters_module_scss_1 = require("./Filters.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var slider_1 = require("primereact/slider");
var AcreageFilter = function (props) {
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState("Di\u1EC7n t\u00EDch"), label = _b[0], setLabel = _b[1];
    var _c = react_1.useState([0, 100]), value = _c[0], setValue = _c[1];
    var _d = react_1.useState(0), min = _d[0], setMin = _d[1];
    var _e = react_1.useState(0), max = _e[0], setMax = _e[1];
    var rate = 10;
    // handle click 
    var onChangeSelection = function (option) {
        props.search({
            key: "acreage",
            slug: min + "-" + max
        });
        setShow(false);
    };
    // rendering
    var renderSlideMenu = function () {
        return (<slider_1.Slider value={value} onChange={function (e) { return setValue(e.value); }} range/>);
    };
    var renderText = function () {
        var from = (min).toLocaleString('it-IT');
        var to = (max).toLocaleString('it-IT');
        return (<span className='p-mb-2'>Diện tích từ {from} m<sup>2</sup> đến {to} m<sup>2</sup></span>);
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
        var from = (min).toLocaleString('it-IT');
        var to = (max).toLocaleString('it-IT');
        setLabel(from + " m2 - " + to + " m2");
    }, [min, max]);
    return (<div className={Filters_module_scss_1["default"].fragment}>
            <dialog_1.Dialog header={'Diện tích'} footer={renderFooter()} visible={show} dismissableMask={true} position='top' onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }}>
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
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AcreageFilter);
