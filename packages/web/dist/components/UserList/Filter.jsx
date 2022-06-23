"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UserList_module_scss_1 = require("./UserList.module.scss");
var dropdown_1 = require("primereact/dropdown");
var inputtext_1 = require("primereact/inputtext");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var router_1 = require("next/router");
var post_1 = require("@/utils/post");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var userCollectionAction_1 = require("@/redux/actions/userCollectionAction");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var Filter = function (props) {
    var router = router_1.useRouter();
    var searchQuery = props.userCollection.query;
    var onChangeSelection = function (option) {
        var name = option.target.name || '';
        var value = option.value || {};
        var newSearchQuery = post_1.filterToSlug(searchQuery, name, value);
        props.updateQuery(newSearchQuery);
        props.fetchPostsRequest({
            isServer: false,
            data: newSearchQuery
        });
        props.fetchPostsSeoMetaRequest({
            isServer: false,
            data: newSearchQuery
        });
        var newUrl = post_1.getUrl(newSearchQuery);
        router.push(newUrl, newUrl, { shallow: true });
    };
    react_1.useEffect(function () {
        var city = props.cities.find(function (res) { return res.slug === searchQuery.city; }) || {};
        if (city.id) {
            props.fetchLocationsRequest({ type: locationsReducer_1.FETCH_DISTRICTS, parent_id: city.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city]);
    return (<div className={UserList_module_scss_1["default"].filterWrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-md-4 p-lg-4 p-col-12">
                        <inputtext_1.InputText className={UserList_module_scss_1["default"].dropdownItem} placeholder="Tìm theo tên, email, số điện thoại..."/>
                    </div>
                    <div className="p-md-2 p-lg-2 p-col-12">
                        <dropdown_1.Dropdown className={UserList_module_scss_1["default"].dropdownItem} onChange={onChangeSelection} options={props.cities} value={props.cities.find(function (city) { return city.slug === searchQuery.city; })} name="city" optionLabel="full_name" filter showClear filterBy="name" placeholder="Tỉnh/Thành phố"/>
                    </div>
                    <div className="p-md-2 p-lg-2 p-col-12">
                        <dropdown_1.Dropdown className={UserList_module_scss_1["default"].dropdownItem} options={props.districts} value={props.districts.find(function (district) { return district.slug === searchQuery.district; })} onChange={onChangeSelection} name="district" optionLabel="full_name" filter showClear filterBy="name" placeholder="Quận/Huyện"/>
                    </div>
                    
                </div>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postsAttributes = _a.postsAttributes, userCollection = _a.userCollection;
    return ({
        cities: locations.cities,
        districts: locations.districts,
        userCollection: userCollection
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchUsersRequest: redux_1.bindActionCreators(userCollectionAction_1.fetchUsersRequest, dispatch),
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Filter);
