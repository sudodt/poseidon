"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Master_1 = require("@/src/components/MasterLayout/Master");
var Filter_1 = require("@/src/components/PostList/Filter");
var Breadcrumb_1 = require("@/src/components/PostList/Breadcrumb");
var Sort_1 = require("@/src/components/PostList/Sort");
var Meta_1 = require("@/src/components/PostList/Meta");
var Right_1 = require("@/src/components/PostList/Right");
var Collection_1 = require("@/src/components/PostList/Collection");
var react_redux_1 = require("react-redux");
var next_seo_1 = require("next-seo");
var useMobileDetect_1 = require("@/utils/hooks/useMobileDetect");
var router_1 = require("next/router");
var Container = function (props) {
    var data = props.search.data;
    var meta = props.search.meta;
    var seoMeta = props.seoMeta;
    var d = new Date();
    var currentDevice = useMobileDetect_1["default"]();
    var isMobile = currentDevice.isMobile() || false;
    var router = router_1.useRouter();
    return (<>
            <Master_1.default>
                <next_seo_1.NextSeo title={seoMeta.title + " m\u1EDBi nh\u1EA5t th\u00E1ng " + (d.getMonth() + 1) + " " + d.getFullYear()} description={seoMeta.description} openGraph={{
            url: 'https://bdstotnhat.com' + router.asPath,
            title: seoMeta.title + " m\u1EDBi nh\u1EA5t th\u00E1ng " + (d.getMonth() + 1) + " " + d.getFullYear(),
            description: seoMeta.description,
            images: [
                {
                    url: 'https://bdstotnhat.com/_next/image?url=%2Fimages%2Flogo.svg&w=384&q=100'
                }
            ],
            site_name: 'bdstotnhat.com'
        }}/>
                <Filter_1.default />
                <Breadcrumb_1.default />
                    <div className="container">
                        <div className={"p-grid"}>
                            <div className="p-col-12 p-md-9 p-lg-9">
                                <Meta_1.default meta={meta} seo={seoMeta}/>
                                <Sort_1.default />
                                <div className="post--wrapper">
                                    <Collection_1.default data={data}/>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-3 p-lg-3">
                                <Right_1.default />
                            </div>
                        </div>
                    </div>
                {/* {isMobile ? <Bottom /> : ''} */}
            </Master_1.default>
        </>);
};
var mapStateToProps = function (_a) {
    var postCollection = _a.postCollection;
    return ({
        search: postCollection.search || {},
        searchQuery: postCollection.searchQuery || {},
        seoMeta: postCollection.seo || {}
    });
};
exports["default"] = react_redux_1.connect(mapStateToProps, null)(Container);
