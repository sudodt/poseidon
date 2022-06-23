"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Filters_module_scss_1 = require("./Filters.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var skeleton_1 = require("primereact/skeleton");
var LocationFilter = function (props) {
    var cities = props.cities;
    var districts = props.districts;
    var wards = props.wards;
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState('Toàn quốc'), label = _b[0], setLabel = _b[1];
    var _c = react_1.useState([]), items = _c[0], setItems = _c[1];
    var searchQuery = props.postCollection.query;
    // fetch districts
    react_1.useEffect(function () {
        var city = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
        if (city.id) {
            props.clearLocations(locationsReducer_1.FETCH_DISTRICTS);
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_DISTRICTS, parent_id: city.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city]);
    // fetch wards
    react_1.useEffect(function () {
        var district = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
        if (district.id) {
            props.clearLocations(locationsReducer_1.FETCH_WARDS);
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_WARDS, parent_id: district.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.district]);
    react_1.useEffect(function () {
        if (searchQuery.city) {
            var city = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
            setLabel(city.full_name);
        }
        if (searchQuery.district) {
            var district = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
            setLabel(district.full_name);
            return setItems(wards);
        }
        if (searchQuery.city) {
            var district = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
            setLabel(district.full_name);
            return setItems(districts);
        }
        else
            return setItems(cities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city, searchQuery.district, cities, districts, wards]);
    react_1.useEffect(function () {
        if (searchQuery.ward) {
            var ward = props.wards.find(function (res) { return res.slug === searchQuery.ward; }) || {};
            return setLabel(ward.full_name);
        }
        if (searchQuery.district) {
            var district = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
            return setLabel(district.full_name);
        }
        if (searchQuery.city) {
            var city = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
            return setLabel(city.full_name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city, searchQuery.district, searchQuery.ward, cities, districts, wards]);
    var onChangeItem = function (item) {
        props.search({
            key: item.type_enum,
            value: item.slug
        });
    };
    var renderFooter = function () {
        return <react_1["default"].Fragment></react_1["default"].Fragment>;
    };
    var renderBackItem = function () {
        var _a;
        var item = {};
        if (searchQuery.district) {
            item = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
        }
        else {
            item = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
        }
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + Filters_module_scss_1["default"].itemBack}>
                    <i className='pi pi-angle-left'></i>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem({
                type_enum: item.type_enum,
                slug: ""
            }); }}>
                        {(_a = item.full_name) !== null && _a !== void 0 ? _a : "Toàn quốc"}
                    </span>
                </li>
            </>);
    };
    var renderHeadItem = function () {
        var head = {};
        if (searchQuery.city) {
            head = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
        }
        if (searchQuery.district) {
            head = props.districts.find(function (res) { return res.slug === searchQuery.district; }) || {};
        }
        if (searchQuery.ward) {
            head = {
                type_enum: "ward",
                slug: ""
            };
        }
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + (items.length == 0 && Filters_module_scss_1["default"].skeletonItem)}>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem(head); }}>
                        Tất cả
                    </span>
                </li>
            </>);
    };
    var renderItems = function (data) {
        var items = [];
        data.forEach(function (element) {
            items.push(itemTemplate(element));
        });
        return items;
    };
    var renderSkeletons = function () {
        var items = [];
        var skeleton = function () {
            return (<>
                    <li className={Filters_module_scss_1["default"].item + " " + Filters_module_scss_1["default"].skeletonItem}>
                        <span>
                            <skeleton_1.Skeleton width="100%" height="2rem"/>
                        </span>
                    </li>
                </>);
        };
        for (var i = 0; i < 4; i++) {
            items.push(skeleton());
        }
        return items;
    };
    var itemTemplate = function (item) {
        var ward = props.wards.find(function (res) { return res.slug === searchQuery.ward; }) || {};
        var active = ward.id === item.id;
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + (active ? Filters_module_scss_1["default"].itemActive : "")}>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem(item); }}>
                        {item.full_name}
                    </span>
                    {active ? <i className="pi pi-chevron-circle-down"/> : <i className='pi pi-angle-right'></i>}
                </li>
            </>);
    };
    return (<div className={Filters_module_scss_1["default"].fragment}>
            <dialog_1.Dialog header={'Lọc theo địa điểm'} footer={renderFooter()} visible={show} dismissableMask={true} position='top' onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }}>
                <ul className={Filters_module_scss_1["default"].list} key={"ul-location-filter"}>
                    {renderBackItem()}
                    {searchQuery.city ? renderHeadItem() : ""}
                    {items.length > 0 ? renderItems(items) : renderSkeletons()}
                </ul>
            </dialog_1.Dialog>
            <button_1.Button type="button" icon="pi pi-map-marker" className={Filters_module_scss_1["default"].button + " p-button-outlined " + (props.maxWidth ? "w-100" : "")} label={label} onClick={function (e) { return setShow(true); }}>
                <span className='pi pi-angle-down'></span>
            </button_1.Button>
        </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postCollection = _a.postCollection;
    return ({
        cities: locations.cities,
        districts: locations.districts,
        wards: locations.wards,
        postCollection: postCollection
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        updateQuery: redux_1.bindActionCreators(postCollectionAction_1.updateQuery, dispatch),
        fetchPostsRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsSeoMetaRequest, dispatch),
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch),
        clearLocations: redux_1.bindActionCreators(locationsAction_1.clearLocations, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LocationFilter);
