"use strict";
exports.__esModule = true;
require("primereact/resources/primereact.min.css");
require("primeflex/primeflex.css");
require("../../styles/globals.scss");
require("react-lazy-load-image-component/src/effects/opacity.css");
require("nprogress/nprogress.css");
require("primereact/resources/themes/lara-light-blue/theme.css");
var next_seo_1 = require("next-seo");
var store_1 = require("@/redux/store");
var dynamic_1 = require("next/dynamic");
var next_seo_config_js_1 = require("../../next-seo.config.js");
var api_1 = require("primereact/api");
var react_1 = require("react");
api_1["default"].ripple = true;
var TopProgressBar = dynamic_1["default"](function () {
    return Promise.resolve().then(function () { return require("../components/Shared/TopProgessBar"); });
}, { ssr: false });
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<react_1["default"].Fragment>
      <next_seo_1.DefaultSeo {...next_seo_config_js_1["default"]}/>
      <TopProgressBar />
        <Component {...pageProps}/>
    </react_1["default"].Fragment>);
}
exports["default"] = store_1.wrapper.withRedux(MyApp);
