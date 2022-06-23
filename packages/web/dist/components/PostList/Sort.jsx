"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dropdown_1 = require("primereact/dropdown");
var react_redux_1 = require("react-redux");
var post_1 = require("@/utils/post");
var router_1 = require("next/router");
var redux_1 = require("redux");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var items = [
    {
        label: 'Mặc định',
        value: ''
    },
    {
        label: 'Mới nhất',
        value: 'id'
    },
    {
        label: 'Cũ nhất',
        value: '-id'
    },
    {
        label: 'Giá từ cao đến thấp',
        value: 'price'
    },
    {
        label: 'Giá từ thấp đến cao',
        value: '-price'
    },
];
var Sort = function (props) {
    var router = router_1.useRouter();
    var searchQuery = props.postCollection.query;
    var sortValue = items.find(function (item) { return item.value === searchQuery.sort; });
    var onChangeSelection = function (option) {
        var name = option.target.name || '';
        var value = option.value || {};
        var newSearchQuery = post_1.filterToSlug(searchQuery, name, value);
        props.updateQuery(newSearchQuery);
        props.fetchPostsRequest({
            isServer: false,
            data: newSearchQuery
        });
        var newUrl = post_1.getUrl(newSearchQuery);
        router.push(newUrl, newUrl, { shallow: true });
    };
    return (<>
            <div>
                <dropdown_1.Dropdown options={items} value={sortValue ? sortValue.value : undefined} name="sort" optionLabel="label" onChange={onChangeSelection} placeholder={"Sắp xếp"}/>
            </div>
        </>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        updateQuery: redux_1.bindActionCreators(postCollectionAction_1.updateQuery, dispatch),
        fetchPostsRequest: redux_1.bindActionCreators(postCollectionAction_1.fetchPostsRequest, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var postCollection = _a.postCollection;
    return ({
        postCollection: postCollection
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Sort);
