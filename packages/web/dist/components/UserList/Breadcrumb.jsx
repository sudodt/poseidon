"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var breadcrumb_1 = require("primereact/breadcrumb");
var UserList_module_scss_1 = require("./UserList.module.scss");
var ListUserBreadCrumb = function (props) {
    var items = [
        {
            label: "Tìm môi giới",
            url: "/tim-moi-gioi"
        }
    ];
    var home = { icon: 'pi pi-home', url: '/' };
    var prefix = '/';
    if (props.searchQuery.city) {
        var city = props.cities.find(function (city) { return city.slug === props.searchQuery.city; }) || false;
        city && items.push({
            label: "" + city.name,
            url: prefix + "/" + city.slug
        });
        if (props.searchQuery.district) {
            var district = props.districts.find(function (district) { return district.slug === props.searchQuery.district; }) || false;
            district && items.push({
                label: "" + district.full_name,
                url: prefix + "/" + city.slug + "/" + district.slug
            });
        }
    }
    return (<div>
            <div className="container">
                <div className="card">
                    <breadcrumb_1.BreadCrumb model={items} home={home} className={UserList_module_scss_1["default"].breadcrumb}/>
                </div>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var userCollection = _a.userCollection, locations = _a.locations;
    return ({
        searchQuery: userCollection.query,
        cities: locations.cities,
        districts: locations.districts
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(ListUserBreadCrumb);
