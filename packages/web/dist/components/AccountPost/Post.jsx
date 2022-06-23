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
var react_1 = require("react");
var datatable_1 = require("primereact/datatable");
var column_1 = require("primereact/column");
var button_1 = require("primereact/button");
var menu_1 = require("primereact/menu");
var Account_1 = require("@/services/Account");
var card_1 = require("primereact/card");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var post_1 = require("@/utils/post");
var react_lazy_load_image_component_1 = require("react-lazy-load-image-component");
var universal_cookie_1 = require("universal-cookie");
var accountsAction_1 = require("@/redux/actions/accountsAction");
var confirmdialog_1 = require("primereact/confirmdialog");
var chip_1 = require("primereact/chip");
var PostTable = function (props) {
    var posts = props.posts;
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var imageBodyTemplate = function (rowData) {
        return <react_lazy_load_image_component_1.LazyLoadImage alt={rowData.title} src={post_1.getThumbImageSrc(rowData.images)} effect="opacity" width={'100%'} height={"120px"}/>;
    };
    var typeTemplate = function (rowData) {
        return (<>
                <chip_1.Chip label={rowData.demand.name}/>
                <chip_1.Chip label={rowData.category.name}/>
            </>);
    };
    var statusBodyTemplate = function (rowData) {
        return <span className={"product-badge status-" + rowData.status_text.toLowerCase()}>{rowData.status_text}</span>;
    };
    var actionTemplate = function (rowData) {
        return (<react_1["default"].Fragment>
                <Action {...rowData} {...props}/>
            </react_1["default"].Fragment>);
    };
    var footer = "T\u1ED5ng c\u1ED9ng " + (posts ? posts.length : 0) + " tin \u0111\u0103ng t\u00ECm th\u1EA5y.";
    return (<card_1.Card>
            <div className="datatable-templating-demo">
                <div className="card">
                    <datatable_1.DataTable value={posts} footer={footer}>
                        <column_1.Column body={imageBodyTemplate}></column_1.Column>
                        <column_1.Column field="title" style={{ 'width': '200px' }} header="Tiều đề"></column_1.Column>
                        <column_1.Column body={typeTemplate} header="Loại"></column_1.Column>
                        <column_1.Column field="created_at" header="Ngày đăng"></column_1.Column>
                        <column_1.Column header="Trạng thái" body={statusBodyTemplate}></column_1.Column>
                        <column_1.Column body={actionTemplate}></column_1.Column>
                    </datatable_1.DataTable>
                </div>
            </div>
        </card_1.Card>);
};
var Action = function (props) {
    var menu = react_1.useRef(null);
    var cookie = new universal_cookie_1["default"]();
    var token = cookie.get('USER_TOKEN');
    var items = [
        {
            label: 'Xem thử',
            icon: 'pi pi-eye',
            command: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    window.open(process.env.APP_DOMAIN + "/" + props.slug + "-pid-" + props.uuid);
                    return [2 /*return*/];
                });
            }); }
        },
        {
            label: 'Chỉnh sửa',
            icon: 'pi pi-pencil',
            command: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); }
        },
        {
            label: (props.status === 'ARCHIVE' ? 'Công khai' : 'Lưu trữ'),
            icon: (props.status === 'ARCHIVE' ? 'pi pi-cloud' : 'pi pi-bookmark'),
            command: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    archiveAction();
                    return [2 /*return*/];
                });
            }); }
        },
        {
            label: 'Xoá',
            icon: 'pi pi-fw pi-trash',
            command: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    deleteAction();
                    return [2 /*return*/];
                });
            }); }
        }
    ];
    var deleteAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            confirmdialog_1.confirmDialog({
                message: 'Bạn có muốn xoá tin đăng này không? Tin đăng này sẽ không thể khôi phục sau khi xoá',
                header: 'Xác nhận',
                icon: 'pi pi-exclamation-triangle',
                accept: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Account_1["default"].updateStatusPosts(token, props.uuid, 'DELETE')];
                            case 1:
                                _a.sent();
                                props.fetchAccountPostsRequest({ isServer: false, token: token });
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
            return [2 /*return*/];
        });
    }); };
    var archiveAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            confirmdialog_1.confirmDialog({
                message: 'Tin đăng này sẽ chuyển sang trạng thái nháp, sẽ cần kiểm duyệt lại trước khi công khai',
                header: 'Xác nhận',
                icon: 'pi pi-exclamation-triangle',
                accept: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Account_1["default"].updateStatusPosts(token, props.uuid, 'ARCHIVE')];
                            case 1:
                                _a.sent();
                                props.fetchAccountPostsRequest({ isServer: false, token: token });
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
            return [2 /*return*/];
        });
    }); };
    return (<react_1["default"].Fragment>
            <menu_1.Menu model={items} popup ref={menu}/>
            <button_1.Button className="p-button-text p-button-rounded" icon="pi pi-ellipsis-v" onClick={function (event) { return menu.current.toggle(event); }}/>
            {/* <EditPost post={props} visible={openEdit}/> */}
        </react_1["default"].Fragment>);
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAccountPostsRequest: redux_1.bindActionCreators(accountsAction_1.fetchAccountPostsRequest, dispatch)
    };
};
var mapStateToProps = function (_a) {
    var accounts = _a.accounts, locations = _a.locations;
    return ({
        account: (accounts === null || accounts === void 0 ? void 0 : accounts.account) || {},
        locations: locations || {},
        posts: (accounts === null || accounts === void 0 ? void 0 : accounts.posts) || [],
        isLoading: accounts.isLoading || false
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PostTable);
