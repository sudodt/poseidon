"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PostList_module_scss_1 = require("./PostList.module.scss");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var router_1 = require("next/router");
var post_1 = require("@/utils/post");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var LocationFilter_1 = require("./Filters/LocationFilter");
var CategoryFilter_1 = require("./Filters/CategoryFilter");
var PriceFilter_1 = require("./Filters/PriceFilter");
var AcreageFilter_1 = require("./Filters/AcreageFilter");
var AdvancedFilter_1 = require("./Filters/AdvancedFilter");
var utils_1 = require("primereact/utils");
var Filter = function (props) {
    var router = router_1.useRouter();
    var searchQuery = props.postCollection.query;
    var search = function (query, refresh) {
        if (refresh === void 0) { refresh = false; }
        var newSearchQuery = !refresh
            ? post_1.filterToSlug(searchQuery, query.key, query)
            : post_1.filterToSlug(searchQuery, query.key, '');
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
    return (<div className={utils_1.classNames(PostList_module_scss_1["default"].filterWrapper)}>
            <div className="container">
                <div className={PostList_module_scss_1["default"].filterDynamic}>
                    <AdvancedFilter_1.default search={search}/>
                    <LocationFilter_1.default search={search}/>
                    <CategoryFilter_1.default search={search}/>
                    <PriceFilter_1.default search={search}/>
                    <AcreageFilter_1.default search={search}/>
                </div>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var locations = _a.locations, postsAttributes = _a.postsAttributes, postCollection = _a.postCollection;
    return ({
        cities: locations.cities,
        districts: locations.districts,
        categories: postsAttributes.categories,
        postCollection: postCollection
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        updateQuery: redux_1.bindActionCreators(postCollectionAction_1.updateQuery, dispatch),
        fetchPostsRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsSeoMetaRequest, dispatch),
        fetchLocationsRequest: redux_1.bindActionCreators(locationsAction_1.fetchLocationsRequest, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Filter);
