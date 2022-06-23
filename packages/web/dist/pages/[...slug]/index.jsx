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
exports.getServerSideProps = void 0;
var store_1 = require("@/redux/store");
var react_redux_1 = require("react-redux");
var postsAttributesAction_1 = require("@/redux/actions/postsAttributesAction");
var locationsAction_1 = require("@/redux/actions/locationsAction");
var postCollectionAction_1 = require("@/redux/actions/postCollectionAction");
var postAction_1 = require("@/redux/actions/postAction");
var locationsReducer_1 = require("@/redux/reducers/locationsReducer");
var Container_1 = require("@/src/components/PostList/Container");
var Container_2 = require("@/components/Post/Container");
var post_1 = require("@/utils/post");
var _error_1 = require("../_error");
var View = function (props) {
    var view = null;
    switch (props.view) {
        case 'list':
            view = <Container_1.default />;
            break;
        case 'page':
            view = <Container_2.default />;
            break;
        case 'map':
            view = <Container_1.default />;
            break;
        default:
            view = <_error_1.default />;
            break;
    }
    return view;
};
exports.getServerSideProps = store_1.wrapper.getServerSideProps(function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var view, searchQuery, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                view = post_1.checkViewType(context.query.slug, context.query);
                return [4 /*yield*/, context.store.dispatch(postsAttributesAction_1.fetchCategoriesRequest({ isServer: true }))];
            case 1:
                _a.sent();
                return [4 /*yield*/, context.store.dispatch(postsAttributesAction_1.fetchAttributesRequest())];
            case 2:
                _a.sent();
                return [4 /*yield*/, context.store.dispatch(locationsAction_1.fetchLocationsRequest({
                        isServer: true,
                        type: locationsReducer_1.FETCH_CITIES,
                        parent_id: ''
                    }))];
            case 3:
                _a.sent();
                if (!(view === 'list')) return [3 /*break*/, 7];
                searchQuery = post_1.routeToSearchFilter(context.query.slug, Object.assign({}, context.query));
                return [4 /*yield*/, context.store.dispatch(postCollectionAction_1.updateQuery(searchQuery))];
            case 4:
                _a.sent();
                return [4 /*yield*/, context.store.dispatch(postCollectionAction_1.fetchPostsRequest({
                        isServer: true,
                        data: searchQuery
                    }))];
            case 5:
                _a.sent();
                return [4 /*yield*/, context.store.dispatch(postCollectionAction_1.fetchPostsSeoMetaRequest({
                        isServer: true,
                        data: searchQuery
                    }))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                if (!(view === 'page')) return [3 /*break*/, 9];
                code = post_1.getCode(context.query.slug[0]);
                return [4 /*yield*/, context.store.dispatch(postAction_1.fetchPostRequest({
                        isServer: true,
                        code: code
                    }))];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, {
                    props: {
                        view: view
                    }
                }];
        }
    });
}); });
var mapStateToProps = function (_a) {
    var postCollection = _a.postCollection;
    return ({});
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(View);
