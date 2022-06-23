"use strict";
exports.__esModule = true;
var button_1 = require("primereact/button");
var react_1 = require("react");
var Counter_module_scss_1 = require("./Counter.module.scss");
var useDebounce_1 = require("@/utils/hooks/useDebounce");
var Counter = function (props) {
    var _a = react_1.useState(0), counter = _a[0], setCounter = _a[1];
    var debounceCounter = useDebounce_1.useDebounce(counter);
    var min = 0;
    var max = 10;
    var search = props.search;
    var increment = function () {
        if (counter == max)
            return;
        setCounter(counter + 1);
    };
    var decrement = function () {
        if (counter == min)
            return;
        setCounter(counter - 1);
    };
    react_1.useEffect(function () {
        if (debounceCounter) {
            search({
                key: props.searchKey,
                value: debounceCounter
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceCounter]);
    return (<react_1["default"].Fragment>
           <div className="p-grid">
                <div className="p-md-2 p-lg-2">
                    <button_1.Button icon="pi pi-minus" className="p-button-rounded" disabled={!counter && true} onClick={decrement}/>
                </div>
                <div className="p-md-8 p-lg-8">
                    <div className={Counter_module_scss_1["default"].counter}>
                        <span>{counter}</span><span className="p-pl-1">{props.string}</span>
                    </div>
                </div>
                <div className="p-md-2 p-lg-2">
                    <button_1.Button icon="pi pi-plus" className="p-button-rounded" disabled={counter == max && true} onClick={increment}/>
                </div>
            </div>
       </react_1["default"].Fragment>);
};
exports["default"] = Counter;
