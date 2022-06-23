"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("primereact/button");
var dialog_1 = require("primereact/dialog");
var Filters_module_scss_1 = require("./Filters.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var postsAttributesAction_1 = require("@/redux/actions/postsAttributesAction");
var skeleton_1 = require("primereact/skeleton");
var ALL_STRING = "Tất cả loại BĐS";
var CategoryFilter = function (props) {
    var postsAttributes = props.postsAttributes;
    var categories = postsAttributes.categories;
    var specialties = postsAttributes.specialties;
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState(ALL_STRING), label = _b[0], setLabel = _b[1];
    var _c = react_1.useState([]), items = _c[0], setItems = _c[1];
    var searchQuery = props.postCollection.query;
    // fetch districts
    react_1.useEffect(function () {
        var category = categories.find(function (res) { return res.slug === searchQuery.category; }) || {};
        if (category.id) {
            props.fetchSpecialtiesRequest(category.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.category]);
    react_1.useEffect(function () {
        if (searchQuery.specialty) {
            var specialty = specialties.find(function (res) { return res.slug === searchQuery.specialty; }) || {};
            setItems(specialties);
            setLabel(specialty.name);
            return;
        }
        if (searchQuery.category) {
            var category = categories.find(function (res) { return res.slug === searchQuery.category; }) || {};
            setLabel(category.name);
            setItems(specialties);
            return;
        }
        setItems(categories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.category, searchQuery.specialty, specialties, categories]);
    var onChangeItem = function (item) {
        props.search({
            key: item.category_id ? "specialty" : "category",
            value: item.slug
        });
    };
    var renderFooter = function () {
        return <react_1["default"].Fragment></react_1["default"].Fragment>;
    };
    var renderBackItem = function () {
        var _a;
        var item = {};
        if (searchQuery.category) {
            item = categories.find(function (res) { return res.slug === searchQuery.category; }) || {};
        }
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + Filters_module_scss_1["default"].itemBack}>
                    <i className='pi pi-angle-left'></i>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem({
                category_id: item.category_id,
                slug: ""
            }); }}>
                        {(_a = item.name) !== null && _a !== void 0 ? _a : ALL_STRING}
                    </span>
                </li>
            </>);
    };
    var renderHeadItem = function () {
        var getHeadItem = function () {
            if (searchQuery.category) {
                var category = categories.find(function (res) { return res.slug === searchQuery.category; }) || {};
                return {
                    id: category.id,
                    slug: category.slug
                };
            }
            return {
                id: "",
                slug: ""
            };
        };
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + (items.length == 0 && Filters_module_scss_1["default"].skeletonItem)}>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem(getHeadItem()); }}>
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
        var specialty = specialties.find(function (res) { return res.slug === searchQuery.specialty; }) || {};
        var active = specialty.id === item.id;
        return (<>
                <li className={Filters_module_scss_1["default"].item + " " + (active ? Filters_module_scss_1["default"].itemActive : "")}>
                    <span className={Filters_module_scss_1["default"].tagLink} onClick={function (e) { return onChangeItem(item); }}>
                        {item.name}
                    </span>
                    {active ? <i className="pi pi-chevron-circle-down"/> : <i className='pi pi-angle-right'></i>}
                </li>
            </>);
    };
    return (<div className={Filters_module_scss_1["default"].fragment}>
            <dialog_1.Dialog header={'Lọc theo loại BĐS'} footer={renderFooter()} visible={show} dismissableMask={true} position='top' onHide={function () { return setShow(false); }} breakpoints={{ '960px': '75vw' }} style={{ width: '25vw' }}>
                <ul className={Filters_module_scss_1["default"].list}>
                    {renderBackItem()}
                    {renderHeadItem()}
                    {items.length > 0 ? renderItems(items) : renderSkeletons()}
                </ul>
            </dialog_1.Dialog>
            <button_1.Button type="button" className={Filters_module_scss_1["default"].button + " p-button-outlined " + (props.maxWidth ? "w-100" : "")} label={label} onClick={function (e) { return setShow(true); }}>
                <span className='pi pi-angle-down'></span>
            </button_1.Button>
        </div>);
};
var mapStateToProps = function (_a) {
    var postsAttributes = _a.postsAttributes, postCollection = _a.postCollection;
    return ({
        postCollection: postCollection,
        postsAttributes: postsAttributes
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        updateQuery: redux_1.bindActionCreators(postCollectionAction_1.updateQuery, dispatch),
        fetchPostsRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsSeoMetaRequest, dispatch),
        fetchSpecialtiesRequest: redux_1.bindActionCreators(postsAttributesAction_1.fetchSpecialtiesRequest, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
