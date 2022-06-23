"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dialog_1 = require("primereact/dialog");
var EditPost = function (props) {
    var _a = react_1.useState(props.visible), visible = _a[0], setVisible = _a[1];
    return (<>
            <dialog_1.Dialog header="Header" visible={props.visible} maximizable={true} modal onHide={function () { return setVisible(!visible); }} style={{ width: '100vw', height: '100vh' }}>
                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </dialog_1.Dialog>
        </>);
};
exports["default"] = EditPost;
