"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var price_1 = require("@/utils/price");
var location_1 = require("@/utils/location");
var button_1 = require("primereact/button");
var bs_1 = require("react-icons/bs");
var Report_1 = require("./Report");
var InternalLink_1 = require("./InternalLink");
var Body = function (props) {
    var data = props.data || {};
    var demand = data.demand || {};
    var category = data.category || {};
    var getPriceString = function (item) {
        var _a;
        if (!item) {
            return '';
        }
        if (((_a = item === null || item === void 0 ? void 0 : item.demand) === null || _a === void 0 ? void 0 : _a.slug) == 'cho-thue') {
            return price_1.priceText(item.price) + "/" + item.price_unit;
        }
        return price_1.priceText(item.price);
    };
    return (<div className={Post_module_scss_1["default"].wrapper}>
            <div className={Post_module_scss_1["default"].header}>
                <h1 className={Post_module_scss_1["default"].title}>{data.title}</h1>

                <div className={Post_module_scss_1["default"].subDesc}>
                    <div className={'p-grid'}>
                        <div className={'p-md-8 p-d-flex p-ai-center'}>
                            <span className={Post_module_scss_1["default"].price + " p-mr-2"}>
                                {getPriceString(data)}
                            </span> - 
                            <span className={Post_module_scss_1["default"].acreage + " p-ml-2"}>
                                {data.acreage} m2
                            </span>
                        </div>
                        <div className={"p-md-4 " + Post_module_scss_1["default"].actionTop}>
                            <button_1.Button label="Lưu tin" icon={'pi pi-heart'} className="p-button-danger p-button-outlined"/>
                        </div>
                        <div className={'p-md-12'}>
                            <div className={Post_module_scss_1["default"].address}>
                                <i className="pi pi-map-marker p-pr-1"></i>{location_1.getAddressString(data)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={Post_module_scss_1["default"].htmlDescription}>
                    <div dangerouslySetInnerHTML={{ __html: (data.description ? data.description.replace(/\n/g, '<br />') : '') }}></div>
                </div>

                <div className={Post_module_scss_1["default"].detailDescription}>
                    <div className={Post_module_scss_1["default"].detailDescriptionHeader}>
                        <span>Thông tin chi tiết</span>
                    </div>
                    <div className={'p-grid'}>
                        <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                            <bs_1.BsDot size={20}/>Loại hình: {demand.name} {category.name}
                        </div>
                        <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                            <bs_1.BsDot size={20}/>Diện tích: {data.acreage} m2
                        </div>
                        {data.acreage_used ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Diện tích sử dụng: {data.acreage_used} m2
                            </div>
            : ''}
                        {data.bedroom ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Số phòng ngủ: {data.bedroom} phòng
                            </div>
            : ''}
                        {data.bathroom ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Số phòng tắm: {data.bathroom} phòng
                            </div>
            : ''}
                        {data.floor ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>Số tầng: {data.floor}</div>
            : ''}
                        {data.direction ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Hướng cửa chính: {data.direction}
                            </div>
            : ''}

                        {data.juridical ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Pháp lý: {data.juridical}
                            </div>
            : ''}

                        {data.front ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Mặt tiền: {data.front} m
                            </div>
            : ''}
                        
                        {data.footage ?
            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <bs_1.BsDot size={20}/>Chiều sâu: {data.footage} m
                            </div>
            : ''}
                        
                    </div>
                </div>
            
                <div className={Post_module_scss_1["default"].report}>
                    <Report_1.default />
                </div>

                <div>
                    <InternalLink_1.default />
                </div>

            </div>
        </div>);
};
exports["default"] = Body;
