"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var AccountProfile_module_scss_1 = require("./AccountProfile.module.scss");
var url_1 = require("@/utils/url");
var mapStateToProps = function (_a) {
    var accounts = _a.accounts;
    return ({
        account: (accounts === null || accounts === void 0 ? void 0 : accounts.account) || {}
    });
};
var Avatar = function (props) {
    var account = props.account;
    var _a = react_1.useState(null), file = _a[0], setFile = _a[1];
    var _b = react_1.useState(url_1.getImageUrl(account.avatar)), image = _b[0], setImage = _b[1];
    react_1.useEffect(function () {
        setImage(url_1.getImageUrl(account.avatar));
    }, [account]);
    var onFileChange = function (e) {
        setFile(e.target.files[0]);
    };
    react_1.useEffect(function () {
        var objectUrl = "";
        if (file) {
            props.setValue("avatar", file);
            objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);
        }
        // free memory when ever this component is unmounted
        return function () { return URL.revokeObjectURL(objectUrl); };
    }, [file]);
    return (<react_1["default"].Fragment>
            <div className={AccountProfile_module_scss_1["default"].wrapper}>
                <div className={AccountProfile_module_scss_1["default"].avatar} style={{ backgroundImage: "url(" + image + ")" }}>
                    {props.editMode &&
            <>
                        <input type="file" onChange={onFileChange} className={AccountProfile_module_scss_1["default"].inputFile}/>
                        <span className={AccountProfile_module_scss_1["default"].icon}>
                            <i className={"pi pi-camera"}></i>
                        </span>
                    </>}
                </div>

                <div className={AccountProfile_module_scss_1["default"].displayName}>
                    <span>{account.name}</span>
                </div>
            </div>
        </react_1["default"].Fragment>);
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Avatar);
