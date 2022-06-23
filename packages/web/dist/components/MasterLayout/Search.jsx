"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dropdown_1 = require("primereact/dropdown");
var autocomplete_1 = require("primereact/autocomplete");
var MasterLayout_module_scss_1 = require("./MasterLayout.module.scss");
var Search_1 = require("@/src/services/Search");
var router_1 = require("next/router");
var items = [
    { label: "Mua bán", value: "mua-ban" },
    { label: "Cho thuê", value: "cho-thue" },
    { label: "Môi giới", value: "tim-moi-gioi" },
];
var Search = function (props) {
    var router = router_1.useRouter();
    var _a = react_1.useState([]), filteredResults = _a[0], setFilteredResults = _a[1];
    var _b = react_1.useState(null), seletedSearch = _b[0], setSeletedSearch = _b[1];
    var _c = react_1.useState(items[0]), searchType = _c[0], setSearchType = _c[1];
    var search = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Search_1["default"].search(event.query)];
                case 1:
                    results = _a.sent();
                    if (results.data && results.data[0]) {
                        setFilteredResults(mapItemLabel(results.data[0]));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onChangeSearchType = function (e) {
        var value = items.find(function (res) { return res.value === e.value; }) || {};
        setSearchType(value);
    };
    var mapItemLabel = function (items) {
        return items.map(function (res) {
            return __assign(__assign({}, res), { name: searchType.label + " B\u0110S t\u1EA1i " + res.full_name });
        });
    };
    var onChangeValue = function (e) {
        setSeletedSearch(e.value);
        if (e.value instanceof Object) {
            var url = buildRouting(e.value, searchType.value == 'tim-moi-gioi' ? true : false);
            router.push(url);
        }
    };
    var buildRouting = function (value, isPrefixDemand) {
        var _a, _b, _c, _d, _e, _f;
        if (isPrefixDemand === void 0) { isPrefixDemand = false; }
        var demand = searchType.value;
        if (value.parent) {
            var l2 = value.parent;
            if (l2.parent) {
                return isPrefixDemand
                    ? "/" + demand + "/" + ((_a = l2.parent) === null || _a === void 0 ? void 0 : _a.slug) + "/" + ((_b = value.parent) === null || _b === void 0 ? void 0 : _b.slug) + "/" + value.slug
                    : "/" + ((_c = l2.parent) === null || _c === void 0 ? void 0 : _c.slug) + "/" + ((_d = value.parent) === null || _d === void 0 ? void 0 : _d.slug) + "/" + value.slug + "/" + demand;
            }
            return isPrefixDemand
                ? "/" + demand + "/" + ((_e = value.parent) === null || _e === void 0 ? void 0 : _e.slug) + "/" + value.slug
                : "/" + ((_f = value.parent) === null || _f === void 0 ? void 0 : _f.slug) + "/" + value.slug + "/" + demand;
        }
        return isPrefixDemand
            ? "/" + demand + "/" + value.slug
            : "/" + value.slug + "/" + demand;
    };
    return (<>
      <div className="p-inputgroup">
        <dropdown_1.Dropdown className={MasterLayout_module_scss_1["default"].selection} options={items} onChange={onChangeSearchType} value={searchType.value}/>
        <autocomplete_1.AutoComplete value={seletedSearch} className={MasterLayout_module_scss_1["default"].input} placeholder="Tìm kiếm..." suggestions={filteredResults} completeMethod={search} field="name" onChange={onChangeValue}/>
      </div>
    </>);
};
exports["default"] = Search;
