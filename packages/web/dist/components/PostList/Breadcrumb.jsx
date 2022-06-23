"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var breadcrumb_1 = require("primereact/breadcrumb");
var PostList_module_scss_1 = require("./PostList.module.scss");
var app_json_1 = require("../../config/app.json");
var ListPostBreadCrumb = function (props) {
    var items = [];
    var home = { icon: 'pi pi-home', url: '/' };
    var demand = app_json_1["default"].demandData.find(function (demand) { return demand.slug === props.searchQuery.demand; }) || false;
    var category = props.categories.find(function (category) { return category.slug === props.searchQuery.category; }) || {};
    if (demand) {
        if (props.searchQuery.city) {
            var city = props.cities.find(function (city) { return city.slug === props.searchQuery.city; }) || false;
            city && items.push({
                label: "" + city.name,
                url: "/" + city.slug + "/" + demand.slug
            });
            if (props.searchQuery.district) {
                var district = props.districts.find(function (district) { return district.slug === props.searchQuery.district; }) || false;
                district && items.push({
                    label: "" + district.name,
                    url: "/" + city.slug + "/" + district.slug + "/" + demand.slug
                });
            }
        }
        if (!props.searchQuery.category) {
            items.push({
                label: "" + demand.label,
                url: "/" + demand.slug
            });
        }
        else {
            items.push({
                label: demand.label + " " + category.name,
                url: "/" + demand.slug + "-" + category.slug
            });
        }
    }
    return (<div>
            <div className="container">
                <div className="card">
                    <breadcrumb_1.BreadCrumb model={items} home={home} className={PostList_module_scss_1["default"].breadcrumb}/>
                </div>
            </div>
        </div>);
};
var mapStateToProps = function (_a) {
    var postCollection = _a.postCollection, locations = _a.locations, postsAttributes = _a.postsAttributes;
    return ({
        searchQuery: postCollection.query,
        cities: locations.cities,
        districts: locations.districts,
        wards: locations.wards,
        streets: locations.streets,
        areas: locations.areas,
        categories: postsAttributes.categories
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(ListPostBreadCrumb);
