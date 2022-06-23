"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_scss_1 = require("./Post.module.scss");
var avatar_1 = require("primereact/avatar");
var user_1 = require("@/utils/user");
var UserPhone_1 = require("@/src/components/Shared/UserPhone");
var FastMessage_1 = require("./FastMessage");
var User = function (props) {
    var _a;
    var data = props.data || {};
    var profile = data.profile || {};
    var userUrl = "/me/" + data.slug + "-uid-" + data.uuid;
    return (<div className={Post_module_scss_1["default"].leftStickWrapper}>
            <div className="card">
                <div className={"p-shadow-2 " + Post_module_scss_1["default"].userContainer}>
                    <div className={Post_module_scss_1["default"].userContent}>
                        <div className={"p-grid"}>
                            <div className={"p-md-3 " + Post_module_scss_1["default"].userWrapper}>
                                <a href={userUrl}>
                                    <avatar_1.Avatar image={user_1.getUserAvatar(profile)} shape="circle" size="xlarge"/>
                                </a>
                            </div>
                            <div className={'p-md-9'}>
                                <a href={userUrl}>
                                    <div className={Post_module_scss_1["default"].userName}>
                                        {data.name}
                                        {profile.is_verified && <i className={"pi pi-check-circle p-ml-2 " + Post_module_scss_1["default"].hasValidated}/>}
                                    </div>
                                </a>
                                <div>{(_a = data === null || data === void 0 ? void 0 : data.type) === null || _a === void 0 ? void 0 : _a.display}</div>
                                <div>Tham gia từ {data.created_at}</div>
                                <div>Hoạt động {data.last_connection_at}</div>
                            </div>

                            <div className={'p-col-12'}>
                                <UserPhone_1.default data={data}/>
                            </div>
                            <div className={'p-col-12'}>
                                <FastMessage_1.default data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports["default"] = User;
