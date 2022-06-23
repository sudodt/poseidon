"use strict";
exports.__esModule = true;
var react_1 = require("react");
var User_module_scss_1 = require("./User.module.scss");
var react_redux_1 = require("react-redux");
var card_1 = require("primereact/card");
var user_1 = require("@/utils/user");
var UserPhone_1 = require("@/src/components/Shared/UserPhone");
var Left = function (props) {
    var _a;
    var user = props.data || {};
    var profile = user.profile || {};
    var userUrl = "/" + user.slug + "-uid-" + user.uuid;
    var avatarImage = "url(" + user_1.getUserAvatar(profile) + ")";
    return (<card_1.Card>
            <div className={"p-grid"}>
                <div className={"p-col-12 p-d-flex p-ai-center p-jc-center"}>
                    <div className={User_module_scss_1["default"].boxAvatar} style={{ backgroundImage: avatarImage }}>
                    </div>
                </div>

                <div className={"p-col-12"}>
                    <div className={User_module_scss_1["default"].userNameWrapper + " p-d-flex p-ai-center p-jc-center"}>
                        <h1 className={User_module_scss_1["default"].userName}>{user.name}</h1>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-center">
                        <span>{(_a = user.type) === null || _a === void 0 ? void 0 : _a.display}</span>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-center">
                        <span>Đã tham gia {user.created_at}</span>
                    </div>
                </div>

                <div className={"p-col-12"}>
                    <UserPhone_1.default data={user}/>
                </div>
                <div className="p-col-12">
                    <div className={User_module_scss_1["default"].moreInfo}>
                        <div className="p-grid">
                            <div className="p-sm-6 p-md-6 p-col-12 p-d-block p-text-center">
                                <div>{user.posts_count || 0}</div> 
                                <div>tin đăng</div> 
                            </div>
                            <div className="p-sm-6 p-md-6 p-col-12 p-d-block p-text-center">
                                <div>0</div> 
                                <div>đánh giá</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className={User_module_scss_1["default"].description}>
                        <h4>Giới thiệu:</h4>
                        <div dangerouslySetInnerHTML={{ __html: profile.description || 'Người này chưa để lại lời giới thiệu nào' }}></div>
                    </div>
                </div>

            </div>
        </card_1.Card>);
};
var mapStateToProps = function (_a) {
    var user = _a.user;
    return ({
        data: user.data || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Left);
