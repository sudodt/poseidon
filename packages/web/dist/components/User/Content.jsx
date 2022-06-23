"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var card_1 = require("primereact/card");
var tabview_1 = require("primereact/tabview");
var Collection_1 = require("@/src/components/PostList/Collection");
var userReducer_1 = require("@/redux/reducers/userReducer");
var userAction_1 = require("@/redux/actions/userAction");
var Content = function (props) {
    var _a;
    var _b = react_1.useState(0), activeIndex = _b[0], setActiveIndex = _b[1];
    var userUuid = (_a = props.data) === null || _a === void 0 ? void 0 : _a.uuid;
    var buySoldData = props.buySold;
    var rentData = props.rent;
    react_1.useEffect(function () {
        props.fetchAgentPostsRequest({
            isServer: false,
            type: userReducer_1.FETCH_POSTS_BUYSOILD,
            userId: userUuid,
            query: {
                demand: "mua-ban"
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.useEffect(function () {
        var _a;
        if (!((_a = rentData === null || rentData === void 0 ? void 0 : rentData.meta) === null || _a === void 0 ? void 0 : _a.current_page)) {
            props.fetchAgentPostsRequest({
                isServer: false,
                type: userReducer_1.FETCH_POSTS_RENT,
                userId: userUuid,
                query: {
                    demand: "cho-thue"
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rentData]);
    return (<card_1.Card>
            <tabview_1.TabView activeIndex={activeIndex} onTabChange={function (e) { return setActiveIndex(e.index); }}>
                <tabview_1.TabPanel header="Mua bán">
                    <Collection_1.default data={buySoldData.data}/>
                </tabview_1.TabPanel>
                <tabview_1.TabPanel header="Cho thuê">
                    <Collection_1.default data={rentData.data}/>
                </tabview_1.TabPanel>
            </tabview_1.TabView>
        </card_1.Card>);
};
var mapStateToProps = function (_a) {
    var user = _a.user;
    return ({
        data: user.data || {},
        buySold: user.buysoild || {},
        rent: user.rent || {}
    });
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAgentPostsRequest: redux_1.bindActionCreators(userAction_1.fetchAgentPostsRequest, dispatch)
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Content);
